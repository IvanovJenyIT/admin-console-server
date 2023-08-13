import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewController } from './review.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { ReviewModel } from './model/review.model'
import { MovieModel } from 'src/movie/model/movie.model'
import { UserModel } from 'src/auth/model/user.model'

@Module({
	imports: [SequelizeModule.forFeature([ReviewModel, MovieModel, UserModel])],
	controllers: [ReviewController],
	providers: [ReviewService]
})
export class ReviewModule {}
