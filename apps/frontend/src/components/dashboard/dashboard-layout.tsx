import { AppNavbar } from '@/components/sidebars/app-navbar';
import { AppSidebar } from '@/components/sidebars/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export function DashboardLayout({ children }: { children: Readonly<React.ReactNode> }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className='overflow-scroll'>
				<AppNavbar />
				<div className='flex flex-1 flex-col gap-4 p-4 mt-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:mt-14'>
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
