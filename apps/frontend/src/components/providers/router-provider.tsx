import { useAuth } from '@/components/providers/auth-provider';
import { router } from '@/utils/router';
import { RouterProvider as TanstackRouterProvider } from '@tanstack/react-router';

export function RouterProvider() {
	const { isAuthenticated, userData } = useAuth();

	return (
		<TanstackRouterProvider
			router={router}
			context={{
				auth: { isAuthenticated, userData },
			}}
		/>
	);
}
