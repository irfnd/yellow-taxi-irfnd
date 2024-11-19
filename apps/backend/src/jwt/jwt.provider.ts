import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtProvider implements JwtOptionsFactory {
	constructor(private readonly config: ConfigService) {}

	createJwtOptions() {
		return {
			secret: this.config.get<string>('JWT_SECRET'),
			signOptions: { expiresIn: this.config.get<string>('JWT_EXPIRES_IN') },
		};
	}
}
