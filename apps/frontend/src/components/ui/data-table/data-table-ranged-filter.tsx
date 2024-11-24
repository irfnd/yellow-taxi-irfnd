import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { formatNumberConfig, getDate } from '@/utils/others/tools';
import { useDebouncedValue } from '@mantine/hooks';
import { IconFilterSearch, IconStairsDown, IconStairsUp } from '@tabler/icons-react';
import { Column } from '@tanstack/react-table';
import { formatNumeral } from 'cleave-zen';
import { startCase } from 'es-toolkit';
import * as React from 'react';

interface DataTableRangedFilterProps<TData, TValue> {
	column?: Column<TData, TValue>;
	loading: boolean;
}

type FilteredValue = Array<number | Date | undefined>;

export function DataTableRangedFilter<TData, TValue>(props: DataTableRangedFilterProps<TData, TValue>) {
	const { column, loading } = props;
	const filterType = column?.columnDef.meta?.filterType;
	const ranges = column?.getFacetedMinMaxValues();
	const values = column?.getFilterValue() as FilteredValue;

	const [localValues, setLocalValues] = React.useState<FilteredValue>(values);
	const [debouncedValues] = useDebouncedValue(localValues, 500);

	React.useEffect(() => {
		setLocalValues(values);
	}, [values]);

	React.useEffect(() => {
		column?.setFilterValue(debouncedValues);
	}, [column, debouncedValues]);

	const getValues = React.useMemo(() => {
		if (['currency', 'number'].includes(filterType!) && localValues) {
			return localValues.map((val) => (val && typeof val === 'number' ? val : undefined));
		}
		if (filterType === 'date-range' && localValues) {
			return localValues.map((val) => (val && val instanceof Date ? getDate(val) : undefined));
		}
		return undefined;
	}, [filterType, localValues]);

	const getRanges = React.useMemo(() => {
		if (['currency', 'number'].includes(filterType!) && ranges) {
			return ranges.map((val) => (val ? formatNumeral(String(val), formatNumberConfig) : undefined));
		}
		return undefined;
	}, [filterType, ranges]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' size='sm' className='h-8 border-dashed w-full md:w-fit' disabled={loading}>
					<IconFilterSearch className='mr-2 h-4 w-4' />
					{startCase(column?.id!)}
					{getValues?.some(Boolean) ? (
						<>
							<Separator orientation='vertical' className='mx-2 h-4' />
							<Badge className='rounded-sm px-2 -mr-1.5 text-[.65rem] leading-[.9rem] font-normal'>
								{Array.from(new Set(getValues.filter(Boolean)))
									.map((val) => (filterType === 'currency' ? `$${val}` : val))
									.join(' - ')}
							</Badge>
						</>
					) : null}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[260px] p-0' align='start'>
				{['currency', 'number'].includes(filterType!) ? (
					<div className='flex flex-col justify-center gap-2 p-3'>
						<div className='relative flex w-full'>
							<IconStairsDown className='absolute top-2 left-2 [&_svg]:size-4 h-4 w-4' />
							<Input
								type='number'
								className='w-full h-8 pl-8'
								value={getValues?.[0] ? String(getValues[0]) : ''}
								placeholder={`Min (${getRanges?.[0] || 0})`}
								onChange={(e) => setLocalValues((old) => [e.target.value === '' ? undefined : +e.target.value, old?.[1]])}
							/>
						</div>
						<div className='relative flex w-full'>
							<IconStairsUp className='absolute top-2 left-2 [&_svg]:size-4 h-4 w-4' />
							<Input
								type='number'
								className='w-full h-8 pl-8'
								value={getValues?.[1] ? String(getValues[1]) : ''}
								placeholder={`Max (${getRanges?.[1] || 0})`}
								onChange={(e) => setLocalValues((old) => [old?.[0], e.target.value === '' ? undefined : +e.target.value])}
							/>
						</div>
					</div>
				) : null}

				{getValues?.some(Boolean) ? (
					<div className='flex flex-col gap-2 pt-0 p-2 w-full'>
						<Separator />
						<Button variant='ghost' className='h-8' onClick={() => column?.setFilterValue(undefined)}>
							Clear Filter
						</Button>
					</div>
				) : null}
			</PopoverContent>
		</Popover>
	);
}
