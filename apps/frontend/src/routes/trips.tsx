import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { TripTable } from '@/components/trips/trip-table';
import { Loading } from '@/components/ui/loading';
import { DashboardQuery } from '@/utils/queries/dashboard-query';
import { useDocumentTitle } from '@mantine/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/trips')({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: '/sign-in', search: { redirect: location.href } });
	},
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
		<DashboardLayout>
			<div className='flex flex-col w-full gap-4'>
				<h1 className='text-xl font-bold'>Trips</h1>
				<TripTable trips={trips} />
			</div>
		</DashboardLayout>
	);
}
