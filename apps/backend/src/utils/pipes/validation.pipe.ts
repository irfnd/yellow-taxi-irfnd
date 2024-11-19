import { BadRequestException, ValidationPipe } from '@nestjs/common';

export function UseValidationPipe() {
	return new ValidationPipe({
		transform: true,
		exceptionFactory: (errors) => {
			return new BadRequestException('Validation failed', {
				cause: errors.map(({ property, constraints }) => ({
					field: property,
					message: constraints ? Object.values(constraints)[0] : 'Unknown error',
				})),
			});
		},
	});
}
