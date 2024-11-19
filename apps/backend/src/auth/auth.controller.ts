import * as Nest from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';
import { JwtRefreshContext } from '../jwt/jwt-refresh.decorator';
import { JwtRefreshGuard } from '../jwt/jwt-refresh.guard';
import { ErrorResponses } from '../utils/dto/global-error.dto';
import { AuthService } from './auth.service';
import { AuthResponses } from './dto/auth-reponse.dto';
import { SignInDto } from './dto/auth-entity.dto';

@Nest.Controller()
@Swagger.ApiTags('Auth')
@ErrorResponses.InternalServerError()
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Nest.Post('sign-in')
	@Nest.HttpCode(Nest.HttpStatus.OK)
	@Swagger.ApiOperation({ summary: 'Sign In', description: 'Sign in to get authorization JWT token' })
	@AuthResponses.SignIn.OK()
	@ErrorResponses.BadRequest()
	async login(@Nest.Body() data: SignInDto) {
		const token = await this.auth.login(data);
		return { message: 'You have successfully signed in', token };
	}

	@Nest.Get('refresh-token')
	@Nest.UseGuards(JwtRefreshGuard)
	@Swagger.ApiBearerAuth()
	@Swagger.ApiOperation({ summary: 'Refresh Token', description: 'Renew a authorization JWT token' })
	@AuthResponses.RefreshToken.OK()
	@ErrorResponses.Unauthorized()
	async refreshToken(@JwtRefreshContext() tokenCtx: { isNew: boolean; token: string }) {
		const message = tokenCtx.isNew ? 'Your token has been refreshed' : 'Your token has not expired yet';
		return { message, token: tokenCtx.token };
	}
}
