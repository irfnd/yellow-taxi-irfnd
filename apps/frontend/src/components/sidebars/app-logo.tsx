import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { IconCar } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

export function AppLogo() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton size='lg' className='space-x-1' asChild>
					<Link to='/'>
						<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
							<IconCar className='size-6 -rotate-[12deg]' />
						</div>
						<div className='grid flex-1 text-left text-sm leading-tight'>
							<span className='truncate font-semibold'>Yellow Taxi</span>
							<span className='truncate text-xs'>Analytics Dashboard</span>
						</div>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
