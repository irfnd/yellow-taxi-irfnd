export function NotFound() {
	return (
		<div className='flex flex-1 justify-center items-center w-full'>
			<div className='flex items-center flex-col'>
				<img src='/not-found.svg' alt='Not Found Illustration' className='[&_svg]:size-96' />
				<h1 className='text-2xl font-bold -mt-4'>Not Found</h1>
				<p className='text-muted-foreground'>The page you are looking for does not exist.</p>
				<p className='text-muted-foreground'>It might have been moved or deleted.</p>
			</div>
		</div>
	);
}
