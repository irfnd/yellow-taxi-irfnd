export {};

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		filterVariant?: 'range' | 'facet';
		filterType?: 'date' | 'date-range' | 'number' | 'currency';
	}

	interface FilterFns {
		dateRangeFilterFn: FilterFn<unknown>;
	}
}
