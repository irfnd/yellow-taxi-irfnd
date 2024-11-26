import { TripMaps } from '@/components/trips/trip-maps';
import { TripMapsInfo } from '@/components/trips/trip-maps-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/utils/cn';
import { DirectionQuery } from '@/utils/queries/direction-query';
import { tripSchema } from '@/utils/validations/trip-schema';
import { useDocumentTitle } from '@mantine/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';

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
	const { pickup, dropoff } = Route.useLoaderDeps();
	const trip = Route.useSearch();
	const direction = useSuspenseQuery(DirectionQuery(pickup, dropoff));

	return (
		<div className={cn('flex gap-4 w-full flex-col-reverse', open ? 'lg:flex-1 lg:flex-row' : 'md:flex-1 md:flex-row')}>
			<TripMapsInfo trip={trip} direction={direction.data} />
			<TripMaps initialPoint={pickup.map((val) => parseFloat(val))} direction={direction.data} />
		</div>
	);
}
