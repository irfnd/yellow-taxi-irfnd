import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconDots, IconEye } from '@tabler/icons-react';
import { Row } from '@tanstack/react-table';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function TripTableActions<TData>(props: DataTableRowActionsProps<TData>) {
	const { row } = props;

	return (
		<DropdownMenu modal>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
					<IconDots className='h-4 w-4' />
					<span className='sr-only'>Open Actions</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start' className='w-[160px]'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='cursor-pointer'>
					<IconEye className='mr-2 h-4 w-4' />
					Show Detail
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
