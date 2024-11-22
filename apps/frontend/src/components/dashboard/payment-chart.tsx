import { EmptyData } from '@/components/ui/empty-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { usePaymentType, useRangeDate } from '@/hooks/use-dashboard';
import { ChartProps } from '@/utils/types/trip-type';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

export function PaymentChart({ dates, trips }: ChartProps) {
	const rangeDate = useRangeDate(dates);
	const paymentType = usePaymentType(trips, dates);

	const totalPayment = React.useMemo(() => {
		return paymentType.reduce((acc, curr) => acc + curr.total, 0);
	}, [paymentType]);

	return (
		<Card className='flex flex-col'>
			<CardHeader>
				<CardTitle>Total Payment</CardTitle>
				<CardDescription>{rangeDate}</CardDescription>
			</CardHeader>
			<CardContent>
				{paymentType.length > 0 ? (
					<ChartContainer
						config={{
							total: { label: 'Total' },
							creditCard: { label: 'Credit Card', color: 'hsl(var(--chart-1))' },
							cash: { label: 'Cash', color: 'hsl(var(--chart-2))' },
							noCharge: { label: 'No Charge', color: 'hsl(var(--chart-3))' },
							dispute: { label: 'Dispute', color: 'hsl(var(--chart-4))' },
							unknown: { label: 'Unknown', color: 'hsl(var(--chart-5))' },
							voidedTrip: { label: 'Voided Trip', color: 'hsl(var(--chart-6))' },
						}}
						className='w-full h-[250px]'
					>
						<PieChart>
							<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
							<Pie data={paymentType} dataKey='total' nameKey='payment' innerRadius={60} strokeWidth={5}>
								<Label
									content={({ viewBox }) => {
										if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
											return (
												<text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
													<tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
														{totalPayment.toLocaleString()}
													</tspan>
													<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
														Payments
													</tspan>
												</text>
											);
										}
									}}
								/>
							</Pie>
						</PieChart>
					</ChartContainer>
				) : (
					<EmptyData />
				)}
			</CardContent>
		</Card>
	);
}
