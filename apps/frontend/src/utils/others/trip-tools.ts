export function getPaymentType(payment: string) {
	switch (payment) {
		case 'CRD':
			return { type: 'Credit Card', fill: 'var(--color-creditCard)' };
		case 'CSH':
			return { type: 'Cash', fill: 'var(--color-cash)' };
		case 'NOC':
			return { type: 'No Charge', fill: 'var(--color-noCharge)' };
		case 'DIS':
			return { type: 'Dispute', fill: 'var(--color-dispute)' };
		case 'UNK':
			return { type: 'Unknown', fill: 'var(--color-unknown)' };
		default:
			return { type: 'Voided Trip', fill: 'var(--color-voidedTrip)' };
	}
}
