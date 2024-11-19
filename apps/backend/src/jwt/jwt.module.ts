import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { CommonModule } from '../common/common.module';
import { JwtProvider } from './jwt.provider';

@Module({
	imports: [
		CommonModule,
		NestJwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useClass: JwtProvider,
		}),
	],
	exports: [NestJwtModule],
})
export class JwtModule {}
