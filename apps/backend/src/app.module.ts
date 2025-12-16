import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';
import { TripModule } from './trips/trip.module';

@Module({
	imports: [CommonModule, JwtModule, AuthModule, TripModule],
	controllers: [AppController],
})
export class AppModule {}
