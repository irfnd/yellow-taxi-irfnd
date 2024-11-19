import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';
import { TripModule } from './trips/trip.module';

@Module({
	imports: [
		// Registering all modules
		CommonModule,
		JwtModule,
		AuthModule,
		TripModule,

		// Registering routes
		RouterModule.register([
			{
				path: 'api',
				children: [
					{ path: 'auth', module: AuthModule },
					{ path: 'trips', module: TripModule },
				],
			},
		]),
	],
})
export class AppModule {}
