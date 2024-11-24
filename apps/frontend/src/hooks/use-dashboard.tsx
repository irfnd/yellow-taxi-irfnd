import { Dates, getDate, getPaymentType, monthOrder } from '@/utils/others/tools';
import { Trip } from '@/utils/validations/trip-schema';
import { format, isWithinInterval, lastDayOfMonth } from 'date-fns';
import { groupBy } from 'es-toolkit';
import * as React from 'react';

export function useFilteredTrip(trips: Trip[], dates?: Dates) {
	const filtered = React.useMemo(() => {
		return dates
			? trips.filter(({ dropoff_datetime }) => {
					const { start, end } = dates;
					return isWithinInterval(getDate(dropoff_datetime), {
						start: getDate(start),
						end: lastDayOfMonth(getDate(end)),
					});
				})
			: trips;
	}, [trips, dates]);

	return filtered;
}

export function useRangeDate(dates?: Dates) {
	const rangeDate = React.useMemo(() => {
		if (dates) {
			const start = getDate(dates.start);
			const end = getDate(dates.end);
			if (start.getFullYear() === end.getFullYear()) return `${format(start, 'MMMM')} - ${format(end, 'MMMM yyyy')}`;
			return `${format(start, 'MMMM yyyy')} - ${format(end, 'MMMM yyyy')}`;
		}
		return 'All time';
	}, [dates]);

	return rangeDate;
}

export function useTotalTrip(trips: Trip[], dates?: Dates) {
	const filteredTrips = useFilteredTrip(trips, dates);

	const totalTrip = React.useMemo(() => {
		const grouped = groupBy(filteredTrips, (trip) => {
			const date = getDate(trip.dropoff_datetime);
			return format(date, 'MMM yyyy');
		});

		const sortedKeys = Object.keys(grouped).sort((a, b) => {
			const [aMonth, aYear] = a.split(' ');
			const [bMonth, bYear] = b.split(' ');
			if (aYear === bYear) return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
			return parseInt(aYear) - parseInt(bYear);
		});

		return sortedKeys.reduce<{ month: string; trips: number; passangers: number }[]>((acc, key) => {
			const group = grouped[key as keyof typeof grouped];
			const passangers = group.reduce((acc, { passenger_count }) => acc + parseInt(passenger_count), 0);
			return [...acc, { month: key, trips: group.length, passangers }];
		}, []);
	}, [filteredTrips]);

	return totalTrip;
}

export function usePaymentType(trips: Trip[], dates?: Dates) {
	const filteredTrips = useFilteredTrip(trips, dates);

	const paymentType = React.useMemo(() => {
		const grouped = groupBy(filteredTrips, (trip) => trip.payment_type);

		const sortedKeys = Object.keys(grouped).sort((a, b) => grouped[b].length - grouped[a].length);

		return sortedKeys.reduce<{ payment: string; total: number; fill: string }[]>((acc, key) => {
			const group = grouped[key as keyof typeof grouped];
			const { type, fill } = getPaymentType(key);
			return [...acc, { payment: type, total: group.length, fill }];
		}, []);
	}, [filteredTrips]);

	return paymentType;
}

export function useFareAmount(trips: Trip[], dates?: Dates) {
	const filteredTrips = useFilteredTrip(trips, dates);

	const fareAmount = React.useMemo(() => {
		const grouped = groupBy(filteredTrips, (trip) => {
			const date = getDate(trip.dropoff_datetime);
			return format(date, 'MMM yyyy');
		});

		const sortedKeys = Object.keys(grouped).sort((a, b) => {
			const [aMonth, aYear] = a.split(' ');
			const [bMonth, bYear] = b.split(' ');
			if (aYear === bYear) return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
			return parseInt(aYear) - parseInt(bYear);
		});

		return sortedKeys.reduce<{ month: string; maxFareAmount: number }[]>((acc, key) => {
			const group = grouped[key as keyof typeof grouped];
			const maxFareAmount = Math.max(...group.map(({ fare_amount }) => parseFloat(fare_amount)));
			return [...acc, { month: key, maxFareAmount }];
		}, []);
	}, [filteredTrips]);

	return fareAmount;
}

export function useTripDistance(trips: Trip[], dates?: Dates) {
	const filteredTrips = useFilteredTrip(trips, dates);

	const tripDistance = React.useMemo(() => {
		const grouped = groupBy(filteredTrips, (trip) => {
			const date = getDate(trip.dropoff_datetime);
			return format(date, 'MMM yyyy');
		});

		const sortedKeys = Object.keys(grouped).sort((a, b) => {
			const [aMonth, aYear] = a.split(' ');
			const [bMonth, bYear] = b.split(' ');
			if (aYear === bYear) return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
			return parseInt(aYear) - parseInt(bYear);
		});

		return sortedKeys.reduce<{ month: string; maxTripDistance: number }[]>((acc, key) => {
			const group = grouped[key as keyof typeof grouped];
			const maxTripDistance = Math.max(...group.map(({ trip_distance }) => parseFloat(trip_distance)));
			return [...acc, { month: key, maxTripDistance }];
		}, []);
	}, [filteredTrips]);

	return tripDistance;
}

export function usePaymentDetail(trips: Trip[], dates?: Dates) {
	const filteredTrips = useFilteredTrip(trips, dates);

	const paymentDetail = React.useMemo(() => {
		const grouped = groupBy(filteredTrips, (trip) => {
			const date = getDate(trip.dropoff_datetime);
			return format(date, 'MMM yyyy');
		});

		const sortedKeys = Object.keys(grouped).sort((a, b) => {
			const [aMonth, aYear] = a.split(' ');
			const [bMonth, bYear] = b.split(' ');
			if (aYear === bYear) return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
			return parseInt(aYear) - parseInt(bYear);
		});

		return sortedKeys.reduce<{ month: string; totalCharges: number; totalTips: number }[]>((acc, key) => {
			const group = grouped[key as keyof typeof grouped];
			const totalTips = group.reduce((acc, { tip_amount }) => acc + parseFloat(tip_amount), 0);
			const totalCharges = group.reduce((acc, { total_amount }) => acc + parseFloat(total_amount), 0);
			return [...acc, { month: key, totalCharges, totalTips }];
		}, []);
	}, [filteredTrips]);

	return paymentDetail;
}
