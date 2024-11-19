import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	handleRequest<T>(err: Error, user: T) {
		if (!user || err) {
			throw new UnauthorizedException('Unauthorized access', 'You are not authorized to perform this action');
		}
		return user;
	}
}
