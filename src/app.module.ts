import { Module } from '@nestjs/common'
import { getSequelizeConfig } from './config/db.config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MovieModule } from './movie/movie.module'
import { ReviewModule } from './review/review.module'
import { ViewsModule } from './views/views.module'
import { UserModule } from './auth/auth.module'
import { MediaModule } from './media/media.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getSequelizeConfig,
			inject: [ConfigService]
		}),
		UserModule,
		MovieModule,
		ReviewModule,
		ViewsModule,
		MediaModule
	]
})
export class AppModule {}
