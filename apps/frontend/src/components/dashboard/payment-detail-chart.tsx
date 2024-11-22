import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { EmptyData } from '@/components/ui/empty-data';
import { usePaymentDetail, useRangeDate } from '@/hooks/use-dashboard';
import { ChartProps } from '@/utils/types/trip-type';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

export function PaymentDetailChart({ trips, dates }: ChartProps) {
	const rangeDate = useRangeDate(dates);
	const paymentDetail = usePaymentDetail(trips, dates);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Total Income</CardTitle>
				<CardDescription>{rangeDate}</CardDescription>
			</CardHeader>
			<CardContent>
				{paymentDetail.length > 0 ? (
					<ChartContainer
						config={{
							totalCharges: { label: 'Charges', color: 'hsl(var(--chart-1))' },
							totalTips: { label: 'Tips', color: 'hsl(var(--chart-2))' },
						}}
						className='w-full max-h-[500px]'
					>
						<AreaChart accessibilityLayer data={paymentDetail} margin={{ top: 20, left: 12, right: 12 }}>
							<CartesianGrid vertical={false} />
							<XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
							<defs>
								<linearGradient id='fillTotalCharges' x1='0' y1='0' x2='0' y2='1'>
									<stop offset='5%' stopColor='var(--color-totalCharges)' stopOpacity={0.8} />
									<stop offset='95%' stopColor='var(--color-totalCharges)' stopOpacity={0.1} />
								</linearGradient>
								<linearGradient id='fillTotalTips' x1='0' y1='0' x2='0' y2='1'>
									<stop offset='5%' stopColor='var(--color-totalTips)' stopOpacity={0.8} />
									<stop offset='95%' stopColor='var(--color-totalTips)' stopOpacity={0.1} />
								</linearGradient>
							</defs>
							<Area
								dataKey='totalTips'
								type='natural'
								fill='url(#fillTotalTips)'
								fillOpacity={0.4}
								stroke='var(--color-totalTips)'
								stackId='a'
							/>
							<Area
								dataKey='totalCharges'
								type='natural'
								fill='url(#fillTotalCharges)'
								fillOpacity={0.4}
								stroke='var(--color-totalCharges)'
								stackId='a'
							/>
						</AreaChart>
					</ChartContainer>
				) : (
					<EmptyData />
				)}
			</CardContent>
		</Card>
	);
}
