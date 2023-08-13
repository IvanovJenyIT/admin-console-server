import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMovieDto } from './dto/create-movie.dto'
import { InjectModel } from '@nestjs/sequelize'
import { WhereOptions, Op } from 'sequelize'
import { MovieModel } from './model/movie.model'
import { ReviewModel } from 'src/review/model/review.model'
import { UserModel } from 'src/auth/model/user.model'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel)
		private readonly movieModel: typeof MovieModel
	) {}

	async byId(id: number) {
		const movie = await this.movieModel.findOne({
			where: { id },
			include: [
				{
					model: ReviewModel,
					include: [UserModel]
				}
			]
		})

		if (!movie) throw new NotFoundException('Video not found')

		return movie
	}

	async getAll(searchTerm?: string) {
		let options: WhereOptions<MovieModel> = {}

		if (searchTerm)
			options = {
				[Op.or]: [
					{
						name: { like: `%${searchTerm}%` }
					}
				]
			}

		return this.movieModel.findAll({
			where: { ...options },
			order: [['createdAt', 'DESC']],
			include: [
				{
					all: true
				}
			]
		})
	}

	async create() {
		const movie = await this.movieModel.create()
		return movie.id
	}

	async update(id: number, createMovieDto: CreateMovieDto) {
		const movie = await this.byId(id)
		return movie.update({ ...movie, ...createMovieDto })
	}

	async delete(id: number) {
		return this.movieModel.destroy({ where: { id } })
	}
}
