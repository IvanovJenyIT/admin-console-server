import { Injectable } from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { InjectModel } from '@nestjs/sequelize'
import { ReviewModel } from './model/review.model'

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel)
		private readonly reviewModel: typeof ReviewModel
	) {}

	async create(userId: number, createReviewDto: CreateReviewDto) {
		return this.reviewModel.create({
			userId,
			...createReviewDto
		})
	}
}
