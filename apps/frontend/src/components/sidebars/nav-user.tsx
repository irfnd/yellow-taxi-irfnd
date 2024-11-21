import { useAuth } from '@/components/providers/auth-provider';
import { NavUserLogout } from '@/components/sidebars/nav-user-logout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { IconArrowsSort, IconLogout, IconUser } from '@tabler/icons-react';
import * as React from 'react';

export function NavUser() {
	const { isMobile } = useSidebar();
	const { userData } = useAuth();
	const [logoutDialog, setLogoutDialog] = React.useState(false);

	if (!userData) return null;
	return (
		<>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size='lg'
								className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
							>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarFallback className='rounded-lg'>
										<IconUser className='size-5' />
									</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>{userData.fullname}</span>
									<span className='truncate text-xs'>{userData.email}</span>
								</div>
								<IconArrowsSort className='ml-auto size-4' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-[--radix-dropdown-menu-trigger-width] min-w-52 rounded-lg'
							side={isMobile ? 'bottom' : 'right'}
							align='end'
							sideOffset={isMobile ? 20 : 36}
						>
							<DropdownMenuLabel className='p-0 font-normal'>
								<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarFallback className='rounded-lg'>
											<IconUser className='size-5' />
										</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-semibold'>{userData.fullname}</span>
										<span className='truncate text-xs'>{userData.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem className='cursor-pointer' onClick={() => setLogoutDialog(true)}>
									<IconLogout />
									Log out
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
			<NavUserLogout visible={logoutDialog} setVisible={setLogoutDialog} />
		</>
	);
}
