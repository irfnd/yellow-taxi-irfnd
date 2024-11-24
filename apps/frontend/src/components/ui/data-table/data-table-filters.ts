import { getDate } from '@/utils/others/tools';
import { FilterFn } from '@tanstack/react-table';
import { isEqual } from 'date-fns';

const dateRangeFilterFn: FilterFn<any> = (row, columnId, value) => {
	const [pickup, dropoff] = (row.getValue(columnId) as Date[]).map((val) => getDate(val));
	const valueDate = getDate(value);
	return isEqual(valueDate, pickup) || isEqual(valueDate, dropoff);
};
dateRangeFilterFn.autoRemove;

export { dateRangeFilterFn };
