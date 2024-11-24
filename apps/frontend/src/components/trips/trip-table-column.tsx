import { TripTableActions } from '@/components/trips/trip-table-actions';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { cn } from '@/utils/cn';
import { getDate, getPaymentType } from '@/utils/others/tools';
import { Trip } from '@/utils/validations/trip-schema';
import { IconMapPinDown, IconMapPinUp } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const tripColumns: ColumnDef<Trip>[] = [
	{
		id: 'actions',
		cell: ({ row }) => <TripTableActions row={row} />,
	},
	{
		accessorKey: 'vendor_id',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Vendor ID' />,
		cell: ({ row }) => <span className='font-bold'>{row.getValue('vendor_id')}</span>,
	},
	{
		accessorKey: 'payment_type',
		meta: { filterVariant: 'facet' },
		header: ({ column }) => <DataTableColumnHeader column={column} title='Payment Type' />,
		cell: ({ row }) => {
			const payment = getPaymentType(row.getValue('payment_type'));
			return (
				<div className='flex flex-wrap gap-1'>
					<Badge className={cn('font-medium cursor-pointer', payment.style)}>{payment.type}</Badge>
				</div>
			);
		},
		filterFn: (row, id, value) => value.includes(row.getValue(id)),
	},
	{
		accessorKey: 'datetime',
		accessorFn: (row) => [getDate(row.pickup_datetime), getDate(row.dropoff_datetime)],
		header: ({ column }) => <DataTableColumnHeader column={column} title='Date Time' />,
		cell: ({ row }) => {
			const [pickup, dropoff] = row.getValue<Date[]>('datetime');
			return (
				<div className='w-[200px] flex flex-col gap-1'>
					<div className='flex items-center gap-2'>
						<IconMapPinUp className='[&_svg]:size-5 h-5 w-5 text-primary' />
						<p className='text-xs'>{format(pickup, 'MMM, dd yyyy (H:mm)')}</p>
					</div>
					<div className='flex items-center gap-2'>
						<IconMapPinDown className='[&_svg]:size-5 h-5 w-5 text-blue-500' />
						<p className='text-xs'>{format(dropoff, 'MMM, dd yyyy (H:mm)')}</p>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: 'passenger_count',
		accessorFn: (row) => parseInt(row.passenger_count),
		header: ({ column }) => (
			<DataTableColumnHeader className='justify-center' btnClassName='-mr-3' column={column} title='Passenger Count' />
		),
		cell: ({ row }) => <p className='text-center'>{parseInt(row.getValue('passenger_count')).toLocaleString()}</p>,
	},
	{
		accessorKey: 'trip_distance',
		accessorFn: (row) => parseFloat(row.trip_distance),
		meta: { filterVariant: 'range', filterType: 'number' },
		header: ({ column }) => (
			<DataTableColumnHeader className='justify-end' btnClassName='-mr-3' column={column} title='Trip Distance' />
		),
		cell: ({ row }) => <p className='text-right'>{parseFloat(row.getValue('trip_distance')).toLocaleString()}</p>,
	},
	{
		accessorKey: 'fare_amount',
		accessorFn: (row) => parseFloat(row.fare_amount),
		meta: { filterVariant: 'range', filterType: 'currency' },
		header: ({ column }) => (
			<DataTableColumnHeader className='justify-end' btnClassName='-mr-3' column={column} title='Fare Amount' />
		),
		cell: ({ row }) => <p className='text-right'>${parseFloat(row.getValue('fare_amount')).toLocaleString()}</p>,
	},
	{
		accessorKey: 'tip_amount',
		accessorFn: (row) => parseFloat(row.tip_amount),
		header: ({ column }) => (
			<DataTableColumnHeader className='justify-end' btnClassName='-mr-3' column={column} title='Tip Amount' />
		),
		cell: ({ row }) => <p className='text-right'>${parseFloat(row.getValue('tip_amount')).toLocaleString()}</p>,
	},
	{
		accessorKey: 'total_amount',
		accessorFn: (row) => parseFloat(row.total_amount),
		meta: { filterVariant: 'range', filterType: 'currency' },
		header: ({ column }) => (
			<DataTableColumnHeader className='justify-end' btnClassName='-mr-3' column={column} title='Total Amount' />
		),
		cell: ({ row }) => <p className='text-right'>${parseFloat(row.getValue('total_amount')).toLocaleString()}</p>,
	},
];
