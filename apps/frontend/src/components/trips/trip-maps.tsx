import 'mapbox-gl/dist/mapbox-gl.css';

import { useTheme } from '@/components/providers/theme-provider';
import { FeatureCollection } from 'geojson';
import { LineLayerSpecification } from 'mapbox-gl';
import * as React from 'react';
import Map, { Layer, Marker, NavigationControl, Source } from 'react-map-gl';

interface Props {
	initialPoint: number[];
	direction: Record<string, any>;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;
const MAPBOX_DARK_MAP = import.meta.env.VITE_MAPBOX_DARK_MAP as string;
const MAPBOX_LIGHT_MAP = import.meta.env.VITE_MAPBOX_LIGHT_MAP as string;

export function TripMaps({ direction }: Props) {
	const { theme } = useTheme();

	const initialViewState = React.useMemo(() => {
		const bounds = direction.waypoints.map((waypoint: any) => waypoint.location);
		return { bounds, fitBoundsOptions: { padding: 200 } };
	}, [direction]);

	const mapTheme = React.useMemo(() => (theme === 'dark' ? MAPBOX_DARK_MAP : MAPBOX_LIGHT_MAP), [theme]);

	const geojsonData = React.useMemo<FeatureCollection>(
		() => ({
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: null,
					geometry: direction.routes[0].geometry,
				},
			],
		}),
		[direction]
	);

	const lineStyle = React.useMemo<LineLayerSpecification>(
		() => ({
			id: 'directionLine',
			source: 'directionSource',
			type: 'line',
			layout: { 'line-join': 'round', 'line-cap': 'round' },
			paint: { 'line-color': theme === 'dark' ? '#FACC14' : '#2761d9', 'line-width': 4 },
		}),
		[theme]
	);

	return (
		<Map
			mapboxAccessToken={MAPBOX_TOKEN}
			initialViewState={initialViewState}
			style={{ width: '100%', flex: 1, borderRadius: '0.5rem' }}
			mapStyle={mapTheme}
		>
			<Source id='directionSource' type='geojson' data={geojsonData}>
				<Layer {...lineStyle} />
			</Source>
			<Marker
				color='hsl(var(--chart-2))'
				longitude={initialViewState.bounds[0][0]}
				latitude={initialViewState.bounds[0][1]}
			/>
			<Marker
				color='hsl(var(--chart-2))'
				longitude={initialViewState.bounds[1][0]}
				latitude={initialViewState.bounds[1][1]}
			/>
			<NavigationControl />
		</Map>
	);
}
