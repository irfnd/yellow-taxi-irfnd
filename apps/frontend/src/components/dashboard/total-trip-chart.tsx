import { EmptyChart } from '@/components/dashboard/empty-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useRangeDate, useTotalTrip } from '@/hooks/use-dashboard';
import { ChartProps } from '@/utils/types/trip-type';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export function TotalTripChart({ dates, trips }: ChartProps) {
	const rangeDate = useRangeDate(dates);
	const totalTrip = useTotalTrip(trips, dates);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Total Trip & Passenger</CardTitle>
				<CardDescription>{rangeDate}</CardDescription>
			</CardHeader>
			<CardContent>
				{totalTrip.length > 0 ? (
					<ChartContainer
						config={{
							trips: { label: 'Trips', color: 'hsl(var(--chart-2))' },
							passangers: { label: 'Passangers', color: 'hsl(var(--chart-1))' },
						}}
						className='w-full max-h-[500px]'
					>
						<BarChart accessibilityLayer data={totalTrip} margin={{ top: 20, left: 12, right: 12 }}>
							<CartesianGrid vertical={false} />
							<XAxis dataKey='month' tickLine={false} tickMargin={10} axisLine={false} fontSize={10} />
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
							<Bar dataKey='trips' stackId='a' fill='var(--color-trips)' radius={[0, 0, 4, 4]} />
							<Bar dataKey='passangers' stackId='a' fill='var(--color-passangers)' radius={[4, 4, 0, 0]} />
						</BarChart>
					</ChartContainer>
				) : (
					<EmptyChart />
				)}
			</CardContent>
		</Card>
	);
}
