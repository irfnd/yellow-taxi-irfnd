import { TripQueryDto } from '../../trips/dto/trip-query.dto';

interface QueryOptions<T> {
	range: Array<keyof T>;
	multiple: Array<keyof T>;
}

const rangeQuery = (key: string, value: string[]): string => {
	if (value.length > 1) return `${key} between '${value[0]}' and '${value[1]}'`;
	return `${key} = '${value[0]}'`;
};

const multipleQuery = (key: string, value: string[]): string => {
	if (value.length > 1) return `${key} in (${value.map((v) => `'${v}'`).join(',')})`;
	return `${key} = '${value[0]}'`;
};

export function transformQuery<T extends TripQueryDto>(query: T, { range, multiple }: QueryOptions<T>) {
	const queryKeys = Object.keys(query) as Array<keyof T>;
	if (queryKeys.length > 0) {
		const queryArr = queryKeys.reduce<string[]>((acc, key) => {
			const value = query[key] as unknown as string[];
			if (range.includes(key)) acc.push(rangeQuery(key as string, value));
			else if (multiple.includes(key)) acc.push(multipleQuery(key as string, value));
			return acc;
		}, []);
		return `$query= SELECT * WHERE ${queryArr.join(' and ')}`;
	}
	return '';
}
