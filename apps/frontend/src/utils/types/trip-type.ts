import { Dates } from '@/utils/others/tools';
import { Trip } from '@/utils/validations/trip-schema';

export interface ChartProps {
	dates?: Dates;
	trips: Trip[];
}
