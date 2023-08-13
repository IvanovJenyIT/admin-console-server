import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from './model/user.model'
import { ReviewModel } from 'src/review/model/review.model'
import { JwtStrategy } from './strategy/jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from 'src/config/jwt.config'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getJWTConfig,
			inject: [ConfigService]
		}),
		SequelizeModule.forFeature([UserModel, ReviewModel])
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class UserModule {}
