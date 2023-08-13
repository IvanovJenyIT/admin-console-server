import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from '@nestjs/sequelize'
import { ConfigService } from '@nestjs/config'
import { UserModel } from '../model/user.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		@InjectModel(UserModel)
		private readonly userModel: typeof UserModel
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

	async validate({ id }: Pick<UserModel, 'id'>) {
		return this.userModel.findByPk(id)
	}
}
