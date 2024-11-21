import { api } from '@/utils/axios';
import { Trip } from '@/utils/types/trip-type';

export const dashboardReq = async (): Promise<Trip[]> => {
	const response = await api.get('/trips');
	return response.data.trips;
};
