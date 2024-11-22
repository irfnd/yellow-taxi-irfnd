import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/utils/cn';
import { IconArrowNarrowDown, IconArrowNarrowUp, IconArrowsUpDown, IconEyeOff } from '@tabler/icons-react';
import { Column } from '@tanstack/react-table';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
	btnClassName?: string;
}

export function DataTableColumnHeader<TData, TValue>(props: DataTableColumnHeaderProps<TData, TValue>) {
	const { column, title, className, btnClassName } = props;

	if (!column.getCanSort()) return <div className={cn(className)}>{title}</div>;
	return (
		<div className={cn('flex items-center space-x-2', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						size='sm'
						className={cn(
							'group -ml-3 h-8 text-foreground font-bold data-[state=open]:bg-primary/10 data-[state=open]:text-primary',
							btnClassName
						)}
					>
						<span>{title}</span>
						{column.getIsSorted() === 'desc' ? (
							<IconArrowNarrowDown className='ml-2 h-3 w-3 text-foreground/55 group-hover:text-primary group-data-[state=open]:text-primary group-data-[state=open]:bg-primary/10' />
						) : column.getIsSorted() === 'asc' ? (
							<IconArrowNarrowUp className='ml-2 h-3 w-3 text-foreground/55 group-hover:text-primary group-data-[state=open]:text-primary group-data-[state=open]:bg-primary/10' />
						) : (
							<IconArrowsUpDown className='ml-2 h-3 w-3 text-foreground/55 group-hover:text-primary group-data-[state=open]:text-primary group-data-[state=open]:bg-primary/10' />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='min-w-[100px]' align='start'>
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<IconArrowNarrowUp className='mr-2 h-3.5 w-3.5 text-foreground/55' />
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<IconArrowNarrowDown className='mr-2 h-3.5 w-3.5 text-foreground/55' />
						Desc
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => column.clearSorting()}>
						<IconArrowsUpDown className='mr-2 h-3.5 w-3.5 text-foreground/55' />
						Reset
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
						<IconEyeOff className='mr-2 h-3.5 w-3.5 text-foreground/55' />
						Hide
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
