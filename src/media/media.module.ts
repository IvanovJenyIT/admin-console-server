import { Module } from '@nestjs/common'
import { MediaService } from './media.service'
import { MediaController } from './media.controller'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'uploads'),
			serveRoot: '/uploads'
		})
	],
	controllers: [MediaController],
	providers: [MediaService]
})
export class MediaModule {}
