import { NotFound } from '@/components/ui/not-found';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/trips')({
	component: TripLayoutComponent,
	errorComponent: NotFound,
	staticData: { name: 'Trips' },
});

function TripLayoutComponent() {
	return <Outlet />;
}
