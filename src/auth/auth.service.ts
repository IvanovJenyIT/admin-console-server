import {
	Injectable,
	UnauthorizedException,
	BadRequestException
} from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { compare, genSalt, hash } from 'bcryptjs'
import { UserModel } from './model/user.model'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { faker } from '@faker-js/faker'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel)
		private readonly userModel: typeof UserModel,
		private jwtService: JwtService
	) {}

	async login(createAuthDto: CreateAuthDto) {
		const user = await this.validateUser(createAuthDto)
		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async register(createAuthDto: CreateAuthDto) {
		const oldUser = await this.userModel.findOne({
			where: { email: createAuthDto.email }
		})

		if (oldUser)
			throw new BadRequestException('User with this email is already exist')

		const salt = await genSalt(10)

		const newUser = await this.userModel.create({
			email: createAuthDto.email,
			password: await hash(createAuthDto.password, salt),
			name: faker.internet.userName(),
			avatarPath: faker.image.avatar()
		})

		return {
			user: this.returnUserFields(newUser),
			accessToken: await this.issueAccessToken(newUser.id)
		}
	}

	async validateUser(createAuthDto: CreateAuthDto) {
		const user = await this.userModel.findOne({
			where: { email: createAuthDto.email },
			attributes: ['id', 'email', 'password', 'avatarPath', 'name']
		})

		if (!user) throw new UnauthorizedException('User not found')

		const isValidPassword = await compare(createAuthDto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		return user
	}

	async issueAccessToken(userId: string) {
		const data = { id: userId }
		return await this.jwtService.signAsync(data, {
			expiresIn: '31d'
		})
	}

	returnUserFields(user: UserModel) {
		return {
			id: user.id,
			email: user.email,
			avatarPath: user.avatarPath,
			name: user.name
		}
	}
}
