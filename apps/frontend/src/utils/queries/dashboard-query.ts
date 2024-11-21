import { dashboardReq } from '@/utils/others/dashboard-request';
import { queryOptions } from '@tanstack/react-query';

export const DashboardQuery = queryOptions({
	queryKey: ['trips'],
	queryFn: dashboardReq,
});
