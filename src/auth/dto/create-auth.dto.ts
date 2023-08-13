import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateAuthDto {
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Password shoud be 6 characters.'
	})
	@IsString()
	password: string
}
