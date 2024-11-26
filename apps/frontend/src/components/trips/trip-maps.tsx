import 'mapbox-gl/dist/mapbox-gl.css';

import { useTheme } from '@/components/providers/theme-provider';
import { useSidebar } from '@/components/ui/sidebar';
import { useGeoJson } from '@/hooks/use-geojson';
import { cn } from '@/utils/cn';
import { useElementSize } from '@mantine/hooks';
import bbox from '@turf/bbox';
import { LineLayerSpecification } from 'mapbox-gl';
import * as React from 'react';
import Map, { Layer, MapRef, Marker, NavigationControl, Source } from 'react-map-gl';

interface Props {
	initialPoint: number[];
	direction: Record<string, any>;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;
const MAPBOX_DARK_MAP = import.meta.env.VITE_MAPBOX_DARK_MAP as string;
const MAPBOX_LIGHT_MAP = import.meta.env.VITE_MAPBOX_LIGHT_MAP as string;

export function TripMaps({ direction }: Props) {
	const { theme } = useTheme();
	const { open } = useSidebar();

	const mapRef = React.useRef<MapRef>(null);
	const { ref: mapWrapperRef, width, height } = useElementSize();

	const initialViewState = React.useMemo(() => {
		const bounds = direction.waypoints.map((waypoint: any) => waypoint.location);
		return { bounds, fitBoundsOptions: { padding: 50 } };
	}, [direction]);

	const geoJsonData = useGeoJson({ direction });

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

	React.useEffect(() => {
		if (mapRef.current) {
			const map = mapRef.current.getMap();
			const [minLng, minLat, maxLng, maxLat] = bbox(direction.routes[0].geometry);
			// prettier-ignore
			map.fitBounds([[minLng, minLat], [maxLng, maxLat]], initialViewState.fitBoundsOptions);
			map.resize();
		}
	}, [direction, open, width, height, initialViewState]);

	return (
		<div ref={mapWrapperRef} className={cn('h-[275px]', open ? 'lg:flex-1 lg:h-full' : 'md:flex-1 md:h-full')}>
			<Map
				ref={mapRef}
				mapboxAccessToken={MAPBOX_TOKEN}
				initialViewState={initialViewState}
				mapStyle={theme === 'dark' ? MAPBOX_DARK_MAP : MAPBOX_LIGHT_MAP}
				style={{ borderRadius: '0.5rem' }}
				maxZoom={20}
			>
				<Source id='directionSource' type='geojson' data={geoJsonData}>
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
		</div>
	);
}
