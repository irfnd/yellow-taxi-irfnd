import { api } from '@/utils/axios';
import { Trip } from '@/utils/validations/trip-schema';

export const dashboardReq = async (): Promise<Trip[]> => {
	const response = await api.get('/trips');
	return response.data.trips;
};
