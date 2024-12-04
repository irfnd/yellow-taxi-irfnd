import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/utils/cn';
import { getDuration, getPaymentType } from '@/utils/others/tools';
import { Trip } from '@/utils/validations/trip-schema';
import convert from 'convert';
import { format } from 'date-fns';

interface Props {
	trip: Trip;
	direction: Record<string, any>;
}

export function TripMapsInfo({ trip, direction }: Props) {
	const { pickup_datetime, dropoff_datetime } = trip;
	const { open } = useSidebar();

	const info = direction.routes[0]!;
	const duration = getDuration(pickup_datetime, dropoff_datetime);
	const distance = Number(convert(info.distance, 'm').to('km')).toPrecision(2);
	const payment = getPaymentType(trip.payment_type);

	return (
		<Card className={cn('w-full', open ? 'lg:w-[350px]' : 'md:w-[350px]')}>
			<CardHeader>
				<CardTitle className='text-xl font-bold'>Trip Detail</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col gap-8'>
					<div className='flex flex-col gap-4'>
						<h2 className='font-bold'>Directions</h2>
						<div className='relative flex gap-4 ml-2'>
							<div className='w-[2px] mt-[.1rem] bg-[#2761d9] rounded dark:bg-primary' />
							<div className='flex flex-col gap-4'>
								{direction.waypoints.map((waypoint: any, i: number) => (
									<div key={i}>
										<div className='absolute left-[-.45rem] mt-[.1rem] bg-[hsl(var(--chart-2))] h-4 w-4 rounded-full'></div>
										<div className='flex flex-col'>
											<div className='text-sm font-bold'>{`${i === 0 ? 'From: ' : 'To: '} ${waypoint.name}`}</div>
											<div className='text-xs text-muted-foreground'>
												{i === 0
													? format(pickup_datetime, 'MMM, dd yyyy (H:mm)')
													: format(dropoff_datetime, 'MMM, dd yyyy (H:mm)')}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-4 text-xs'>
						<h2 className='font-bold text-lg'>Information</h2>
						<div className='grid grid-cols-1 gap-4 w-full'>
							<div className='grid grid-cols-1 gap-1'>
								<div className='grid grid-cols-2'>
									<p className='font-bold'>Vendor ID: </p>
									<p className='font-bold'>{trip.vendor_id}</p>
								</div>
								<div className='grid grid-cols-2'>
									<p className='font-bold'>Trip Duration: </p>
									<p>{duration}</p>
								</div>
								<div className='grid grid-cols-2'>
									<p className='font-bold'>Trip Distance: </p>
									<p>{distance} km</p>
								</div>
								<div className='grid grid-cols-2'>
									<p className='font-bold'>Total Tolls: </p>
									<p>{trip.tolls_amount}</p>
								</div>
								<div className='grid grid-cols-2'>
									<p className='font-bold'>Passangers: </p>
									<p>{trip.passenger_count}</p>
								</div>
							</div>
							<div className='grid grid-cols-1 gap-1'>
								<div className='grid grid-cols-2'>
									<p className='font-bold'>Payment Type: </p>
									<Badge className={cn('cursor-pointer w-fit px-1.5 py-0.2', payment.style)}>{payment.type}</Badge>
								</div>
								<div className='grid grid-cols-2'>
									<p className='font-bold'>Tips Amount: </p>
									<p>${parseFloat(trip.tip_amount).toLocaleString()}</p>
								</div>
								<div className='grid grid-cols-2'>
									<p className='font-bold'>Total Charge: </p>
									<p>${parseFloat(trip.total_amount).toLocaleString()}</p>
								</div>
							</div>
							<div className='grid grid-cols-1 gap-1'>
								<div className='grid grid-cols-2'>
									<p className='font-bold'>Fare Amount: </p>
									<p>{trip.fare_amount}</p>
								</div>
								<div className='grid grid-cols-2'>
									<p className='font-bold'>MTA Tax: </p>
									<p>{trip.mta_tax}</p>
								</div>
								<div className='grid grid-cols-2'>
									<p className='font-bold'>Imp. Surcharge: </p>
									<p>{trip.imp_surcharge}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
