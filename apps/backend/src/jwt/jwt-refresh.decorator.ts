import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JwtRefreshContext = createParamDecorator((_, context: ExecutionContext) => {
	return context.switchToHttp().getRequest().user as { isNew: boolean; token: string };
});
