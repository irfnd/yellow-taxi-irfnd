import { addHours } from 'date-fns';

export type Dates = { start: Date; end: Date };

export const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getDate(date: Date | string) {
	if (typeof date === 'string') return addHours(new Date(date), 7);
	return addHours(date, 7);
}
