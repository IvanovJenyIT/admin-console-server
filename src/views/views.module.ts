import { Module } from '@nestjs/common'
import { ViewsService } from './views.service'
import { ViewsController } from './views.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { ViewModel } from './model/view.model'
import { MovieModel } from 'src/movie/model/movie.model'

@Module({
	imports: [SequelizeModule.forFeature([ViewModel, MovieModel])],
	controllers: [ViewsController],
	providers: [ViewsService]
})
export class ViewsModule {}
