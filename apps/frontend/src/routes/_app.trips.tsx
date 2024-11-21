import { useDocumentTitle } from '@mantine/hooks';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/trips')({
	component: TripsComponent,
	staticData: { name: 'Trips', title: 'Trips | Yellow Taxi' },
});

function TripsComponent() {
	const match = Route.useMatch();
	useDocumentTitle(match.staticData.title!);

	return 'Hello /trips!';
}
