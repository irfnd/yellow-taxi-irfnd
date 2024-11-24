import { TripTable } from '@/components/trips/trip-table';
import { Loading } from '@/components/ui/loading';
import { DashboardQuery } from '@/utils/queries/dashboard-query';
import { useDocumentTitle } from '@mantine/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/trips/')({
	loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(DashboardQuery),
	component: TripsComponent,
	pendingComponent: Loading,
	staticData: { name: 'Trips', title: 'Trips | Yellow Taxi' },
});

function TripsComponent() {
	const match = Route.useMatch();
	useDocumentTitle(match.staticData.title!);

	const trips = useSuspenseQuery(DashboardQuery);

	return (
		<div className='flex flex-col w-full gap-4'>
			<h1 className='text-xl font-bold'>Trips</h1>
			<TripTable trips={trips} />
		</div>
	);
}
