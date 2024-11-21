import { FareAmountChart } from '@/components/dashboard/fare-amount-chart';
import { Loading } from '@/components/dashboard/loading';
import { PaymentChart } from '@/components/dashboard/payment-chart';
import { PaymentDetailChart } from '@/components/dashboard/payment-detail-chart';
import { TotalTripChart } from '@/components/dashboard/total-trip-chart';
import { TripDistanceChart } from '@/components/dashboard/trip-distance-chart';
import { Button } from '@/components/ui/button';
import { MonthRangePicker } from '@/components/ui/month-range-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/utils/cn';
import { getDate } from '@/utils/others/parse-date';
import { DashboardQuery } from '@/utils/queries/dashboard-query';
import { useDocumentTitle } from '@mantine/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { format, lastDayOfMonth } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

export const Route = createFileRoute('/_app/')({
	loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(DashboardQuery),
	component: DashboardComponent,
	pendingComponent: Loading,
	staticData: { name: 'Dashboard', title: 'Dashboard | Yellow Taxi' },
});

function DashboardComponent() {
	const { open } = useSidebar();
	const match = Route.useMatch();
	useDocumentTitle(match.staticData.title!);

	const trips = useSuspenseQuery(DashboardQuery);
	const [dates, setDates] = React.useState<{ start: Date; end: Date }>({
		start: getDate(import.meta.env.VITE_DATA_STARTDATE),
		end: lastDayOfMonth(getDate(import.meta.env.VITE_DATA_ENDDATE)),
	});

	return (
		<div className='flex flex-col w-full gap-4'>
			<div className='flex w-full justify-between items-center'>
				<h1 className='text-xl font-bold'>Dashboard</h1>
				<div>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={'outline'}
								className={cn('w-[220px] justify-start text-left font-normal', !dates && 'text-muted-foreground')}
							>
								<CalendarIcon className='mr-2 h-4 w-4' />
								{dates ? (
									`${format(dates.start, 'MMM yyyy')} - ${format(dates.end, 'MMM yyyy')}`
								) : (
									<span>Pick a month range</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent align='end' sideOffset={16} className='w-auto p-0'>
							<MonthRangePicker onMonthRangeSelect={setDates} selectedMonthRange={dates} showQuickSelectors={false} />
						</PopoverContent>
					</Popover>
				</div>
			</div>
			<div className='flex flex-col w-full gap-4'>
				<div
					className={cn('grid auto-rows-min gap-4 grid-cols-1', open ? 'lg:grid-cols-3 xl:grid-cols-3' : 'md:grid-cols-3')}
				>
					<PaymentChart trips={trips.data} dates={dates} />
					<FareAmountChart trips={trips.data} dates={dates} />
					<TripDistanceChart trips={trips.data} dates={dates} />
				</div>
				<TotalTripChart trips={trips.data} dates={dates} />
				<PaymentDetailChart trips={trips.data} dates={dates} />
			</div>
		</div>
	);
}
