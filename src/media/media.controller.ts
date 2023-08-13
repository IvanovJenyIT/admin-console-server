import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { MediaService } from './media.service'
import { Auth } from 'src/auth/guards/auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('file')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	@Post()
	@Auth()
	async uploadMediaFile(
		@UploadedFile() mediaFile: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.mediaService.saveMedia(mediaFile, folder)
	}
}
