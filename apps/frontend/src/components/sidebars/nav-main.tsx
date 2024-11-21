import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { routeList } from '@/utils/router';
import { Link, useLocation } from '@tanstack/react-router';

export function NavMain() {
	const location = useLocation();

	return (
		<SidebarGroup>
			<SidebarMenu>
				{routeList?.map((menu) => (
					<SidebarMenuItem key={menu.name}>
						<SidebarMenuButton tooltip={menu.name} isActive={location.pathname === menu.path} asChild>
							<Link to={menu.path!}>
								{menu.icon && <menu.icon />}
								<span>{menu.name}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
