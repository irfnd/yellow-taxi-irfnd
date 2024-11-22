import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	loading: boolean;
}

export function DataTablePagination<TData>(props: DataTablePaginationProps<TData>) {
	const { table, loading } = props;

	return (
		<div className='flex flex-col items-center justify-end gap-2 md:gap-4 md:flex-row lg:gap-6'>
			<div className='flex items-center space-x-2'>
				<p className='text-sm font-medium'>Rows per page</p>
				<Select
					value={`${table.getState().pagination.pageSize}`}
					onValueChange={(value) => table.setPageSize(Number(value))}
					disabled={loading}
				>
					<SelectTrigger className='h-8 w-[70px]'>
						<SelectValue placeholder={table.getState().pagination.pageSize ?? '10'} />
					</SelectTrigger>
					<SelectContent side='top'>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<SelectItem key={pageSize} value={`${pageSize}`}>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className='flex w-fit items-center justify-center text-sm font-medium'>
				{!loading ? (
					`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`
				) : (
					<Skeleton className='w-full h-5' />
				)}
			</div>

			<div className='flex items-center space-x-2'>
				<Button
					variant='outline'
					className='h-8 w-8 p-0'
					onClick={() => table.setPageIndex(0)}
					disabled={loading || !table.getCanPreviousPage()}
				>
					<span className='sr-only'>Go to first page</span>
					<IconChevronsLeft className='h-4 w-4' />
				</Button>
				<Button
					variant='outline'
					className='h-8 w-8 p-0'
					onClick={() => table.previousPage()}
					disabled={loading || !table.getCanPreviousPage()}
				>
					<span className='sr-only'>Go to previous page</span>
					<IconChevronLeft className='h-4 w-4' />
				</Button>
				<Button
					variant='outline'
					className='h-8 w-8 p-0'
					onClick={() => table.nextPage()}
					disabled={loading || !table.getCanNextPage()}
				>
					<span className='sr-only'>Go to next page</span>
					<IconChevronRight className='h-4 w-4' />
				</Button>
				<Button
					variant='outline'
					className='h-8 w-8 p-0'
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={loading || !table.getCanNextPage()}
				>
					<span className='sr-only'>Go to last page</span>
					<IconChevronsRight className='h-4 w-4' />
				</Button>
			</div>
		</div>
	);
}
