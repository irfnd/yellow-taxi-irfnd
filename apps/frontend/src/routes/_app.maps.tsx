import 'mapbox-gl/dist/mapbox-gl.css';

import { createFileRoute } from '@tanstack/react-router';
import Map from 'react-map-gl';

export const Route = createFileRoute('/_app/maps')({
	component: MapComponent,
});

function MapComponent() {
	return (
		<Map
			mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
			initialViewState={{ longitude: -122.4, latitude: 37.8, zoom: 14 }}
			style={{ width: 600, height: 400 }}
			mapStyle='mapbox://styles/mapbox/streets-v9'
		/>
	);
}
