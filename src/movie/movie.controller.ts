import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Query,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Put
} from '@nestjs/common'
import { MovieService } from './movie.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { Auth } from 'src/auth/guards/auth.guard'

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.movieService.getAll(searchTerm)
	}

	@Get(':id')
	async getVideo(@Param('id') id: string) {
		return this.movieService.byId(+id)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async createVideo() {
		return this.movieService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateVideo(
		@Param('id') id: string,
		@Body() createMovieDto: CreateMovieDto
	) {
		return this.movieService.update(+id, createMovieDto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteVideo(@Param('id') id: string) {
		return this.movieService.delete(+id)
	}
}
