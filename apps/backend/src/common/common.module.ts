import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashingService } from './hashing.service';
import { HttpProvider } from './http.provider';
import { PrismaService } from './prisma.service';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		HttpModule.registerAsync({ imports: [ConfigModule], inject: [ConfigService], useClass: HttpProvider }),
	],
	providers: [PrismaService, HashingService],
	exports: [HttpModule, PrismaService, HashingService],
})
export class CommonModule {}
