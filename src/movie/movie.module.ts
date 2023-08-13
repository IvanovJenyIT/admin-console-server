import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { ReviewModel } from 'src/review/model/review.model'
import { MovieModel } from './model/movie.model'

@Module({
	imports: [SequelizeModule.forFeature([MovieModel, ReviewModel])],
	controllers: [MovieController],
	providers: [MovieService]
})
export class MovieModule {}
