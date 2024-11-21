import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useFareAmount, useRangeDate } from '@/hooks/use-dashboard';
import { ChartProps } from '@/utils/types/trip-type';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';

export function FareAmountChart({ dates, trips }: ChartProps) {
	const rangeDate = useRangeDate(dates);
	const fareAmount = useFareAmount(trips, dates);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Highest Fare Amount</CardTitle>
				<CardDescription>{rangeDate}</CardDescription>
			</CardHeader>
			<CardContent className='flex-1'>
				<ChartContainer
					config={{ maxFareAmount: { label: 'Highest Fare', color: 'hsl(var(--chart-1))' } }}
					className='w-full h-[250px]'
				>
					<LineChart accessibilityLayer data={fareAmount} margin={{ top: 20, right: 12, left: 12 }}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={10} fontSize={10} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
						<Line
							dataKey='maxFareAmount'
							type='natural'
							stroke='var(--color-maxFareAmount)'
							strokeWidth={2}
							dot={{ fill: 'var(--color-maxFareAmount)' }}
							activeDot={{ r: 6 }}
						>
							<LabelList position='top' offset={12} className='fill-foreground' fontSize={9} />
						</Line>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
