import { z } from 'zod';

export const tripSchema = z.object({
	vendor_id: z.string(),
	pickup_datetime: z.string(),
	dropoff_datetime: z.string(),
	passenger_count: z.string(),
	trip_distance: z.string(),
	pickup_longitude: z.string(),
	pickup_latitude: z.string(),
	dropoff_longitude: z.string(),
	dropoff_latitude: z.string(),
	payment_type: z.string(),
	fare_amount: z.string(),
	mta_tax: z.string(),
	tip_amount: z.string(),
	tolls_amount: z.string(),
	total_amount: z.string(),
	imp_surcharge: z.string(),
	rate_code: z.string(),
});

export type Trip = z.infer<typeof tripSchema>;
