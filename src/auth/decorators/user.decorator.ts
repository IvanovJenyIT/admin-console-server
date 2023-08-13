import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserModel } from '../model/user.model'

export const CurrentUser = createParamDecorator(
	(data: keyof UserModel, ctx: ExecutionContext) => {
		const requset = ctx.switchToHttp().getRequest()
		const user = requset.user
		return data ? user[data] : user
	}
)
