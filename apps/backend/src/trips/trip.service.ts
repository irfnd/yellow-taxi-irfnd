import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { transformQuery } from '../utils/others/transform-query';
import { TripQueryDto } from './dto/trip-query.dto';

@Injectable()
export class TripService {
	constructor(private readonly http: HttpService) {}

	async findAll(query: TripQueryDto) {
		const tranformed = transformQuery(query, {
			range: ['pickup_datetime', 'dropoff_datetime', 'fare_amount', 'trip_distance'],
			multiple: ['payment_type'],
		});
		const request = this.http.get(`/gkne-dk5s.json?${encodeURI(tranformed)}`);
		const response = await lastValueFrom(request);
		return response.data;
	}
}
