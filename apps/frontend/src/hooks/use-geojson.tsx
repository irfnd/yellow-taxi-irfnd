import { FeatureCollection } from 'geojson';
import * as React from 'react';

interface Props {
	direction: Record<string, any>;
}

export function useGeoJson({ direction }: Props) {
	const geoJsonData = React.useMemo<FeatureCollection>(
		() => ({
			type: 'FeatureCollection',
			features: [{ type: 'Feature', properties: null, geometry: direction.routes[0].geometry }],
		}),
		[direction]
	);

	return geoJsonData;
}
