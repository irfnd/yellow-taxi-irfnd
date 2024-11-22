import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { EmptyData } from '@/components/ui/empty-data';
import { useRangeDate, useTripDistance } from '@/hooks/use-dashboard';
import { ChartProps } from '@/utils/types/trip-type';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

export function TripDistanceChart({ trips, dates }: ChartProps) {
	const rangeDate = useRangeDate(dates);
	const tripDistance = useTripDistance(trips, dates);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Longest Trip Distance</CardTitle>
				<CardDescription>{rangeDate}</CardDescription>
			</CardHeader>
			<CardContent className='flex-1'>
				{tripDistance.length > 0 ? (
					<ChartContainer
						config={{ maxTripDistance: { label: 'Longest Trip', color: 'hsl(var(--chart-2))' } }}
						className='w-full h-[250px]'
					>
						<LineChart accessibilityLayer data={tripDistance} margin={{ top: 20, right: 12, left: 12 }}>
							<CartesianGrid vertical={false} />
							<XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={10} fontSize={10} />
							<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
							<Line
								dataKey='maxTripDistance'
								type='linear'
								stroke='var(--color-maxTripDistance)'
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ChartContainer>
				) : (
					<EmptyData />
				)}
			</CardContent>
		</Card>
	);
}
