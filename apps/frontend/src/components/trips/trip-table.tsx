import { tripColumns } from '@/components/trips/trip-table-column';
import { DataTable } from '@/components/ui/data-table/data-table';
import { Trip } from '@/utils/validations/trip-schema';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

interface Props {
	trips: UseSuspenseQueryResult<Trip[], Error>;
}

export function TripTable({ trips }: Props) {
	return (
		<DataTable
			columns={tripColumns}
			data={trips.data}
			searchBar={{ column: 'vendor_id', placeholder: 'Search Vendor ID' }}
			loading={trips.isLoading}
		/>
	);
}
