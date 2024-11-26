import { TripMaps } from '@/components/trips/trip-maps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/utils/cn';
import { DirectionQuery } from '@/utils/queries/direction-query';
import { tripSchema } from '@/utils/validations/trip-schema';
import { useDocumentTitle } from '@mantine/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/trips/detail')({
	validateSearch: tripSchema,
	loaderDeps: ({ search }) => {
		const { pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude } = search;
		return { pickup: [pickup_longitude, pickup_latitude], dropoff: [dropoff_longitude, dropoff_latitude] };
	},
	loader: ({ context: { queryClient }, deps: { pickup, dropoff } }) => {
		return queryClient.ensureQueryData(DirectionQuery(pickup, dropoff));
	},
	component: TripDetailComponent,
	staticData: { name: 'Trip Detail', title: 'Trip Detail | Yellow Taxi' },
});

function TripDetailComponent() {
	const match = Route.useMatch();
	useDocumentTitle(match.staticData.title!);

	const { open } = useSidebar();
	const search = Route.useSearch();
	const { pickup, dropoff } = Route.useLoaderDeps();
	const direction = useSuspenseQuery(DirectionQuery(pickup, dropoff));

	return (
		<div className={cn('flex gap-4 w-full flex-col-reverse', open ? 'lg:flex-1 lg:flex-row' : 'md:flex-1 md:flex-row')}>
			<Card className={cn('w-full', open ? 'lg:w-[350px]' : 'md:w-[350px]')}>
				<CardHeader>
					<CardTitle className='text-xl font-bold'>Trip Detail</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-4'>
						<h2 className='font-bold'>Directions</h2>
						<div className='relative flex gap-4 ml-2'>
							<div className='w-[2px] mt-[.1rem] bg-[#2761d9] rounded dark:bg-primary' />
							<div className='flex flex-col gap-4'>
								{direction.data.waypoints.map((waypoint: any, i: number) => (
									<div key={i}>
										<div className='absolute left-[-.45rem] mt-[.1rem] bg-[hsl(var(--chart-2))] h-4 w-4 rounded-full'></div>
										<div className='flex flex-col'>
											<div className='text-sm font-bold'>{waypoint.name}</div>
											<div className='text-xs text-muted-foreground'>
												{i === 0 ? search.pickup_datetime : search.dropoff_datetime}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<TripMaps initialPoint={pickup.map((val) => parseFloat(val))} direction={direction.data} />
		</div>
	);
}
