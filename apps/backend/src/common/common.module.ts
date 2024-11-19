import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { HashingService } from './hashing.service';
import { HttpProvider } from './http.provider';
import { PrismaService } from './prisma.service';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '../..', 'client', 'dist'),
			exclude: ['api/*'],
		}),
		HttpModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useClass: HttpProvider,
		}),
	],
	providers: [PrismaService, HashingService],
	exports: [HttpModule, PrismaService, HashingService],
})
export class CommonModule {}