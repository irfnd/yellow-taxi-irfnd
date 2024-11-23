import { AppNavbar } from '@/components/sidebars/app-navbar';
import { AppSidebar } from '@/components/sidebars/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: '/sign-in', search: { redirect: location.href } });
	},
	component: DashboardLayoutComponent,
});

function DashboardLayoutComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className='overflow-scroll'>
				<AppNavbar />
				<div className='flex flex-1 flex-col gap-4 p-4 mt-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:mt-14'>
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
