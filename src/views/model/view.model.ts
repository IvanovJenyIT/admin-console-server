import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { MovieModel } from 'src/movie/model/movie.model'

@Table({
	tableName: 'View',
	deletedAt: false,
	version: false
})
export class ViewModel extends Model<ViewModel> {
	@ForeignKey(() => MovieModel)
	@Column
	movieId: number

	@Column({ defaultValue: 1 })
	views: number
}
