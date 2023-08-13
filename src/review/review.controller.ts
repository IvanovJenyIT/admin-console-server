import {
	Controller,
	Post,
	Body,
	HttpCode,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { Auth } from 'src/auth/guards/auth.guard'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createReview(
		@CurrentUser('id') id: string,
		@Body() createReviewDto: CreateReviewDto
	) {
		return this.reviewService.create(+id, createReviewDto)
	}
}
