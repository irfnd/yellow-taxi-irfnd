import { AuthContext } from '@/components/providers/auth-provider';
import { QueryClient } from '@tanstack/react-query';

export interface RouteType {
	name: string;
	path: string;
	icon: React.ElementType;
}

export interface RouterContext {
	queryClient: QueryClient;
	auth: Pick<AuthContext, 'isAuthenticated' | 'userData'>;
}
