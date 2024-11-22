import { Button } from '@/components/ui/button';
import { DataTableExtendedProps } from '@/components/ui/data-table/data-table';
import { DataTableFacetedFilter as FacetedFilter } from '@/components/ui/data-table/data-table-faceted-filter';
import { DataTableRangedFilter as RangedFilter } from '@/components/ui/data-table/data-table-ranged-filter';
import { DataTableViewOptions as ViewOptions } from '@/components/ui/data-table/data-table-view-options';
import { Input } from '@/components/ui/input';
import { useDebouncedValue } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { Table } from '@tanstack/react-table';
import * as React from 'react';

interface DataTableToolbarProps<TData> extends DataTableExtendedProps<TData> {
	table: Table<TData>;
	loading: boolean;
	toolbarBtn?: Readonly<React.ReactNode>;
}

export function DataTableToolbar<TData>(props: DataTableToolbarProps<TData>) {
	const { table, searchBar, loading, toolbarBtn } = props;
	const columns = table.getAllColumns().map((column) => ({ id: column.id, filter: column.columnDef.meta?.filterVariant }));
	const isFiltered = table.getState().columnFilters.length > 0;

	const [localSearch, setLocalSearch] = React.useState(
		(table.getColumn(searchBar.column as string)?.getFilterValue() as string) ?? ''
	);
	const [debouncedSearch] = useDebouncedValue(localSearch, 500);

	React.useEffect(() => {
		table.getColumn(searchBar.column as string)?.setFilterValue(debouncedSearch);
	}, [table, searchBar, debouncedSearch]);

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex'>
				<Input
					placeholder={searchBar.placeholder}
					value={localSearch}
					onChange={(e) => setLocalSearch(e.target.value)}
					className='h-8 min-w-[150px] md:w-[250px]'
					disabled={loading}
				/>
				{toolbarBtn}
			</div>

			<div className='flex flex-col gap-2 md:flex-row'>
				{columns
					.sort((a, b) => (a.filter && b.filter ? a.filter.localeCompare(b.filter) : 0))
					.map(({ id, filter }) => {
						if (filter === 'facet') return <FacetedFilter column={table.getColumn(id)} key={id} loading={loading} />;
						if (filter === 'range') return <RangedFilter column={table.getColumn(id)} key={id} loading={loading} />;
						return null;
					})}

				{isFiltered && (
					<Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 md:ml-auto lg:ml-0 lg:px-3'>
						Reset
						<IconX className='ml-2 h-4 w-4' />
					</Button>
				)}

				<ViewOptions table={table} loading={loading} />
			</div>
		</div>
	);
}
