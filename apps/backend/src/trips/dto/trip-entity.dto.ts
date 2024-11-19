import * as Swagger from '@nestjs/swagger';
import * as Validators from 'class-validator';

export class TripEntityDto {
	@Swagger.ApiProperty({ example: 'CMT' })
	@Validators.IsString()
	vendor_id: string;

	@Swagger.ApiProperty({ example: '2014-09-29T11:47:17.000' })
	@Validators.IsDateString()
	pickup_datetime: string;

	@Swagger.ApiProperty({ example: '2014-09-29T12:11:25.000' })
	@Validators.IsDateString()
	dropoff_datetime: string;

	@Swagger.ApiProperty({ example: '1' })
	@Validators.IsNumberString()
	passenger_count: string;

	@Swagger.ApiProperty({ example: '9.1999999999999993' })
	@Validators.IsNumberString()
	trip_distance: string;

	@Swagger.ApiProperty({ example: '-73.950147999999999' })
	@Validators.IsNumberString()
	pickup_longitude: string;

	@Swagger.ApiProperty({ example: '40.783836999999998' })
	@Validators.IsNumberString()
	pickup_latitude: string;

	@Swagger.ApiProperty({ example: 'N' })
	@Validators.IsString()
	store_and_fwd_flag: string;

	@Swagger.ApiProperty({ example: '-74.009202000000002' })
	@Validators.IsNumberString()
	dropoff_longitude: string;

	@Swagger.ApiProperty({ example: '40.713498999999999' })
	@Validators.IsNumberString()
	dropoff_latitude: string;

	@Swagger.ApiProperty({ example: 'CSH' })
	@Validators.IsEnum(['CSH', 'CRD', 'NOC', 'UNK', 'DIS'])
	payment_type: string;

	@Swagger.ApiProperty({ example: '29.5' })
	@Validators.IsNumberString()
	fare_amount: string;

	@Swagger.ApiProperty({ example: '0.5' })
	@Validators.IsNumberString()
	mta_tax: string;

	@Swagger.ApiProperty({ example: '0' })
	@Validators.IsNumberString()
	tip_amount: string;

	@Swagger.ApiProperty({ example: '0' })
	@Validators.IsNumberString()
	tolls_amount: string;

	@Swagger.ApiProperty({ example: '30' })
	@Validators.IsNumberString()
	total_amount: string;

	@Swagger.ApiProperty({ example: '0' })
	@Validators.IsNumberString()
	imp_surcharge: string;

	@Swagger.ApiProperty({ example: '1' })
	@Validators.IsNumberString()
	rate_code: string;
}
