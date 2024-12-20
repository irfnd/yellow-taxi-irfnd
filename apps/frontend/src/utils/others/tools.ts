import { FormatNumeralOptions, NumeralThousandGroupStyles } from 'cleave-zen';
import { addHours, Duration, intervalToDuration } from 'date-fns';

export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const formatNumberConfig: FormatNumeralOptions = {
	delimiter: ',',
	numeralDecimalScale: 2,
	numeralDecimalMark: '.',
	numeralThousandsGroupStyle: NumeralThousandGroupStyles.THOUSAND,
};

export const PaymentList = ['CRD', 'CSH', 'NOC', 'DIS', 'UNK', 'VOT'];

export function getPaymentType(payment: string) {
	switch (payment) {
		case 'CRD':
			return {
				type: 'Credit Card',
				fill: 'var(--color-creditCard)',
				style: 'bg-primary hover:bg-primary/85 text-black',
			};
		case 'CSH':
			return {
				type: 'Cash',
				fill: 'var(--color-cash)',
				style: 'bg-blue-500 hover:bg-blue-500/85 text-white',
			};
		case 'NOC':
			return {
				type: 'No Charge',
				fill: 'var(--color-noCharge)',
				style: 'bg-red-500 hover:bg-red-500/85 text-white',
			};
		case 'DIS':
			return {
				type: 'Dispute',
				fill: 'var(--color-dispute)',
				style: 'bg-orange-500 hover:bg-orange-500/85 text-white',
			};
		case 'UNK':
			return {
				type: 'Unknown',
				fill: 'var(--color-unknown)',
				style: 'bg-purple-500 hover:bg-purple-500/85 text-white',
			};
		default:
			return {
				type: 'Voided Trip',
				fill: 'var(--color-voidedTrip)',
				style: 'bg-gray-800 hover:bg-gray-800/85 text-white',
			};
	}
}

export type Dates = { start: Date; end: Date };

export const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getDate(date: Date | string) {
	if (typeof date === 'string') return addHours(new Date(date), 7);
	return addHours(date, 7);
}

export function getDuration(start: string, end: string) {
	const duration = intervalToDuration({ start: getDate(start), end: getDate(end) });
	const durationKeys = Object.keys(duration) as (keyof Duration)[];
	const formatted = durationKeys.reduce((acc, key) => {
		const value = duration[key];
		if (value) acc.push(`${value} ${key}`);
		return acc;
	}, [] as string[]);
	return formatted.join(', ');
}
