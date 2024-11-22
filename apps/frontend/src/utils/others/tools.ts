import { FormatNumeralOptions, NumeralThousandGroupStyles } from 'cleave-zen';

export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const formatNumberConfig: FormatNumeralOptions = {
	delimiter: ',',
	numeralDecimalScale: 2,
	numeralDecimalMark: '.',
	numeralThousandsGroupStyle: NumeralThousandGroupStyles.THOUSAND,
};
