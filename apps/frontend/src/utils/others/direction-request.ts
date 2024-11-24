import axios from 'axios';

/*
https://api.mapbox.com/directions/v5/mapbox/driving-traffic/-73.87086%2C40.773727%3B-73.973747%2C40.75548?alternatives=false&exclude=toll&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1IjoiaXJmbmQiLCJhIjoiY20zdTFvNzR5MGQ5dzJvb2UwOHB5cDd1ayJ9.w5jgwhQvBogHc4dDPfC40w
*/

export async function directionReq(pickup: string[], dropoff: string[]) {
	const directionApi = import.meta.env.VITE_MAPBOX_DIRECTION_API as string;
	const accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;
	const pickupString = pickup.join(',');
	const dropoffString = dropoff.join(',');
	const directionString = encodeURI(`${pickupString};${dropoffString}`);

	const queries = new URLSearchParams({
		alternatives: 'false',
		exclude: 'toll',
		geometries: 'geojson',
		overview: 'simplified',
		steps: 'false',
		access_token: accessToken,
	});
	const response = await axios.get(`${directionApi}/${directionString}`, { params: queries });
	return response.data;
}
