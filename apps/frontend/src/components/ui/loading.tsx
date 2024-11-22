import { IconCar } from '@tabler/icons-react';

export function Loading() {
	return (
		<div className='flex flex-1 min-h-dvh justify-center items-center w-full'>
			<div className='flex flex-col justify-center items-center'>
				<IconCar className='[&_svg]:size-36 h-36 w-36 animate-bounce text-primary' />
				<h1 className='text-2xl font-bold'>Loading...</h1>
				<p className='text-muted-foreground'>Wait a second.</p>
			</div>
		</div>
	);
}
