import { AppThemeMode } from '@/components/sidebars/app-theme-mode';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Link, useChildMatches } from '@tanstack/react-router';
import { startCase } from 'es-toolkit';
import * as React from 'react';

export function AppNavbar() {
	const childMatches = useChildMatches();

	const breadcrumbs = React.useMemo(() => {
		return childMatches
			.filter((match) => match.fullPath.slice(-1) !== '/')
			.map((match) => ({ name: match.staticData.name, href: match.fullPath }));
	}, [childMatches]);

	return (
		<header className='flex fixed bg-background/95 border-b-[.5px] w-full h-16 items-center z-50 gap-2 transition-[width,height,padding] ease-linear duration-300 md:pr-[17rem] group-has-[[data-collapsible=icon]]/sidebar-wrapper:pr-[4rem] group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14'>
			<div className='flex items-center w-full gap-2 px-4'>
				<SidebarTrigger variant='outline' className='-ml-1 mr-2 h-9 w-9 rounded-lg' />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className='hidden md:block'>
							<BreadcrumbLink asChild>
								<Link to='/'>App</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						{breadcrumbs.length > 0 ? (
							breadcrumbs.map((crumb, i) => (
								<React.Fragment key={crumb.name}>
									<BreadcrumbSeparator className='hidden md:block' />
									<BreadcrumbItem className='hidden md:block'>
										{i === breadcrumbs.length - 1 ? (
											<BreadcrumbPage className='font-bold'>{startCase(crumb.name!)}</BreadcrumbPage>
										) : (
											<BreadcrumbLink asChild>
												<Link to={crumb.href}>{startCase(crumb.name!)}</Link>
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
								</React.Fragment>
							))
						) : (
							<React.Fragment>
								<BreadcrumbSeparator className='hidden md:block' />
								<BreadcrumbItem className='hidden md:block'>
									<BreadcrumbPage className='font-bold'>Dashboard</BreadcrumbPage>
								</BreadcrumbItem>
							</React.Fragment>
						)}
					</BreadcrumbList>
				</Breadcrumb>
				<AppThemeMode />
			</div>
		</header>
	);
}
