import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
	imports: [CommonModule],
	controllers: [TripController],
	providers: [TripService],
})
export class TripModule {}
