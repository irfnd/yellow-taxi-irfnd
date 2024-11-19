import * as Swagger from '@nestjs/swagger';
import * as Transformers from 'class-transformer';
import * as Validators from 'class-validator';

export class TripQueryDto {
	@Validators.IsArray()
	@Validators.IsOptional()
	@Validators.IsDateString({}, { message: 'invalid datetime', each: true })
	@Validators.ArrayMinSize(1, { message: 'pickup_datetime must have at least one value' })
	@Transformers.Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
	@Swagger.ApiProperty({ name: 'pickup_datetime', type: [String], example: '2014-09-29T11:47:17.000', required: false })
	pickup_datetime?: string[];

	@Validators.IsArray()
	@Validators.IsOptional()
	@Validators.IsDateString({}, { message: 'invalid datetime', each: true })
	@Validators.ArrayMinSize(1, { message: 'dropoff_datetime must have at least one value' })
	@Transformers.Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
	@Swagger.ApiProperty({ name: 'dropoff_datetime', type: [String], example: '2014-09-29T12:11:25.000', required: false })
	dropoff_datetime?: string[];

	@Validators.IsArray()
	@Validators.IsOptional()
	@Validators.IsNumberString({}, { message: 'invalid number', each: true })
	@Validators.ArrayMinSize(1, { message: 'trip_distance must have at least one value' })
	@Transformers.Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
	@Swagger.ApiProperty({ name: 'trip_distance', type: [String], example: '9.1999999999999993', required: false })
	trip_distance?: string[];

	@Validators.IsArray()
	@Validators.IsOptional()
	@Validators.IsNumberString({}, { message: 'invalid number', each: true })
	@Validators.ArrayMinSize(1, { message: 'fare_amount must have at least one value' })
	@Transformers.Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
	@Swagger.ApiProperty({ name: 'fare_amount', type: [String], example: '29.5', required: false })
	fare_amount?: string[];

	@Validators.IsArray()
	@Validators.IsOptional()
	@Validators.IsEnum(['CSH', 'CRD', 'NOC', 'UNK', 'DIS'], { message: 'invalid payment type value', each: true })
	@Validators.ArrayMinSize(1, { message: 'payment_type must have at least one value' })
	@Validators.ArrayUnique({ message: 'each payment_type value must be unique' })
	@Transformers.Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
	@Swagger.ApiProperty({ name: 'payment_type', type: [String], example: 'CSH', required: false })
	payment_type?: string[];
}
