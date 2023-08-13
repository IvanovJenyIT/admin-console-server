import { IsNumber, IsNumberString, IsString } from 'class-validator'

export class CreateMovieDto {
	@IsString()
	name: string

	@IsNumber()
	fees: number

	@IsString()
	poster: string

	@IsNumber()
	rating: number
}
