import { IsNumber, IsString } from 'class-validator'

export class CreateReviewDto {
	@IsString()
	description: string

	@IsNumber()
	movieId: number
}
