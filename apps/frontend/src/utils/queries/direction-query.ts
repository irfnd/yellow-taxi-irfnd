import { directionReq } from '@/utils/others/direction-request';
import { queryOptions } from '@tanstack/react-query';

export const DirectionQuery = (pickup: string[], dropoff: string[]) => {
	return queryOptions({
		queryKey: ['direction', { pickup, dropoff }],
		queryFn: () => directionReq(pickup, dropoff),
	});
};
