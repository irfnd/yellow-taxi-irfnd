import { IconDatabaseOff } from '@tabler/icons-react';

export function EmptyData() {
	return (
		<div className='flex justify-center items-center w-full h-[300px]'>
			<div className='flex items-center flex-col'>
				<IconDatabaseOff className='[&_svg]:size-20 h-20 w-20 text-primary' />
				<h1 className='font-bold mt-2'>No Data</h1>
				<p className='text-sm text-muted-foreground'>Data empty or not found</p>
			</div>
		</div>
	);
}
