import { routeTree } from '@/routeTree.gen';
import { RouteType } from '@/utils/types/route-type';
import { IconChartBar, IconRoute } from '@tabler/icons-react';
import { createRouter } from '@tanstack/react-router';
import { queryClient } from '@/components/providers/query-provider';

export const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	context: {
		auth: { isAuthenticated: false, userData: null },
		queryClient,
	},
	defaultPreloadStaleTime: 0,
});

export const routeList: RouteType[] = [
	{ name: 'Dashboard', path: '/', icon: IconChartBar },
	{ name: 'Trips', path: '/trips', icon: IconRoute },
];
