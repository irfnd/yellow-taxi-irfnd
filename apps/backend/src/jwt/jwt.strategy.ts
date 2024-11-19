import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { omit } from 'es-toolkit';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		config: ConfigService,
		private readonly prisma: PrismaService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get<string>('JWT_SECRET'),
			ignoreExpiration: false,
		});
	}

	async validate(payload: Record<string, any>) {
		const { sub: id, ...user } = omit(payload, ['exp', 'iat']);
		const getUser = await this.prisma.users.findFirst({ where: { id } });
		if (getUser) return { id, ...user };
		return null;
	}
}
