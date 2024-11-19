import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { omit } from 'es-toolkit';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		config: ConfigService,
		private readonly jwt: JwtService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get<string>('JWT_SECRET'),
			ignoreExpiration: true,
			passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: Record<string, any>) {
		if (payload) {
			const user = omit(payload, ['exp', 'iat']);
			const oldJwt = req.headers.authorization?.split(' ')[1];
			const checkJwt = Date.now() >= payload.exp * 1000;
			if (checkJwt) return { isNew: true, token: await this.jwt.signAsync(user) };
			return { isNew: false, token: oldJwt };
		}
		return null;
	}
}
