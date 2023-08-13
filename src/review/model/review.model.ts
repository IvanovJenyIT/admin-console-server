import {
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript'
import { MovieModel } from 'src/movie/model/movie.model'
import { UserModel } from 'src/auth/model/user.model'

@Table({
	tableName: 'Review',
	deletedAt: false,
	version: false
})
export class ReviewModel extends Model<ReviewModel> {
	@Column
	description: string

	@ForeignKey(() => MovieModel)
	@Column
	movieId: number

	@BelongsTo(() => MovieModel)
	movie: MovieModel

	@ForeignKey(() => UserModel)
	@Column
	userId: number

	@BelongsTo(() => UserModel)
	user: MovieModel
}
