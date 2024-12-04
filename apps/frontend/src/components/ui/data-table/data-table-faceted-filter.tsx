import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/utils/cn';
import { getPaymentType } from '@/utils/others/tools';
import { IconCheck, IconFilterSearch } from '@tabler/icons-react';
import { Column } from '@tanstack/react-table';
import { startCase } from 'es-toolkit';

interface DataTableFacetedFilterProps<TData, TValue> {
	column?: Column<TData, TValue>;
	loading: boolean;
}

export function DataTableFacetedFilter<TData, TValue>(props: DataTableFacetedFilterProps<TData, TValue>) {
	const { column, loading } = props;
	const { isMobile } = useSidebar();
	const facets = column?.getFacetedUniqueValues();
	const options = facets ? Array.from(facets?.keys()) : [];
	const selectedValues = new Set(column?.getFilterValue() as string[]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' size='sm' className='h-8 border-dashed w-full md:w-fit' disabled={loading}>
					<IconFilterSearch className='mr-2 h-4 w-4' />
					{startCase(column?.id!)}
					{selectedValues?.size > 0 && (
						<>
							<Separator orientation='vertical' className='mx-2 h-4' />
							<Badge className='rounded-sm px-2 -mr-1.5 text-[.65rem] leading-[.9rem] font-normal lg:hidden'>
								{selectedValues.size}
							</Badge>
							<div className='hidden space-x-1 -mr-1.5 lg:flex'>
								{selectedValues.size > 2 ? (
									<Badge className='rounded-sm px-2 text-[.65rem] leading-[.9rem] font-normal'>
										{selectedValues.size} selected
									</Badge>
								) : (
									options
										.filter((option) => selectedValues.has(option))
										.map((option) => {
											if (column?.id === 'payment_type') {
												const payment = getPaymentType(option);
												return (
													<Badge
														key={option}
														className={cn(
															'rounded-sm px-2 text-[.65rem] leading-[.9rem] font-normal capitalize',
															payment.style
														)}
													>
														{payment.type}
													</Badge>
												);
											}
											return (
												<Badge key={option} className='rounded-sm px-2 text-[.65rem] leading-[.9rem] font-normal capitalize'>
													{option}
												</Badge>
											);
										})
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[260px] p-0' align={isMobile ? 'center' : 'start'}>
				<Command>
					<CommandInput placeholder={`Search ${startCase(column?.id!)}`} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options
								.sort((a, b) => a.localeCompare(b))
								.map((option) => {
									const isSelected = selectedValues.has(option);
									return (
										<CommandItem
											key={option}
											onSelect={() => {
												if (isSelected) selectedValues.delete(option);
												else selectedValues.add(option);
												const filterValues = Array.from(selectedValues);
												column?.setFilterValue(filterValues.length ? filterValues : undefined);
											}}
										>
											<div
												className={cn(
													'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
													isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
												)}
											>
												<IconCheck className={cn('h-4 w-4')} />
											</div>
											<span className='capitalize text-foreground'>
												{column?.id === 'payment_type' ? getPaymentType(option).type : option}
											</span>
											{facets?.get(option) && (
												<span className='ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
													{facets.get(option)}
												</span>
											)}
										</CommandItem>
									);
								})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => column?.setFilterValue(undefined)}
										className='justify-center text-center aria-selected:text-primary'
									>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
