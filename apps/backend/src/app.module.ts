import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';
import { TripModule } from './trips/trip.module';

@Module({
	imports: [CommonModule, JwtModule, AuthModule, TripModule],
})
export class AppModule {}
