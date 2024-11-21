import { Toaster } from '@/components/ui/sonner';
import { RouterContext } from '@/utils/types/route-type';
import { IconAlertTriangleFilled, IconCircleCheckFilled } from '@tabler/icons-react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<Outlet />
			<Toaster
				position='top-right'
				toastOptions={{ classNames: { icon: '[&_svg]:size-8 w-8 h-8 mx-1', title: 'font-bold' } }}
				icons={{
					success: <IconCircleCheckFilled className='text-primary' />,
					error: <IconAlertTriangleFilled className='text-destructive' />,
				}}
			/>
		</>
	),
});
