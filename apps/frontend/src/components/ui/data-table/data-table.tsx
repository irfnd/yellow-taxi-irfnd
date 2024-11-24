import { dateRangeFilterFn } from '@/components/ui/data-table/data-table-filters';
import { DataTablePagination as Pagination } from '@/components/ui/data-table/data-table-pagination';
import { DataTableToolbar as Toolbar } from '@/components/ui/data-table/data-table-toolbar';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
	ColumnDef,
	ColumnFiltersState,
	RowData,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

export interface DataTableExtendedProps<T extends RowData> {
	searchBar: { column: keyof T; placeholder: string };
}

interface DataTableProps<TData, TValue> extends DataTableExtendedProps<TData> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[] | undefined;
	loading: boolean;
	toolbarBtn?: Readonly<React.ReactNode>;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
	const { columns, data, searchBar, loading, toolbarBtn } = props;

	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const table = useReactTable({
		columns,
		data: data ?? [],
		state: { sorting, columnVisibility, columnFilters },
		filterFns: { dateRangeFilterFn },

		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,

		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
	});

	return (
		<div className='flex flex-col gap-4'>
			<Toolbar {...{ table, searchBar, loading, toolbarBtn }} />
			<div className='w-full rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{!loading ? (
							table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className='h-80 text-center'>
										No results.
									</TableCell>
								</TableRow>
							)
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='text-center space-y-2'>
									{Array.from({ length: table.getState().pagination.pageSize }).map((_, i) => (
										<Skeleton className='h-16' key={i} />
									))}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<Pagination {...{ table, loading }} />
		</div>
	);
}
