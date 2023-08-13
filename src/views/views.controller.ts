import {
	Controller,
	UsePipes,
	Patch,
	Param,
	ValidationPipe,
	HttpCode
} from '@nestjs/common'
import { ViewsService } from './views.service'

@Controller('views')
export class ViewsController {
	constructor(private readonly viewsService: ViewsService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('update/:movieId')
	login(@Param('movieId') movieId: string) {
		return this.viewsService.updateViews(+movieId)
	}
}
