import { ApiProperty } from '@nestjs/swagger';
import { CreateResponse } from '../others/response.builder';

export class ValidationErrorDto {
	@ApiProperty({ type: 'string', example: 'Fields Name' })
	field!: string;

	@ApiProperty({ type: 'string', example: 'Fields Name must not be empty' })
	message!: string;
}

export const ErrorResponses = {
	BadRequest: () => {
		return CreateResponse({
			key: 'errors',
			type: 'array',
			data: ValidationErrorDto,
			response: { code: 400, status: 'Bad Request', message: 'Validation failed' },
		});
	},
	Unauthorized: () => {
		return CreateResponse({
			key: 'errors',
			type: 'string',
			data: 'You are not authorized to perform this action',
			response: { code: 401, status: 'Unauthorized', message: 'Unauthorized access' },
		});
	},
	Forbidden: () => {
		return CreateResponse({
			key: 'errors',
			type: 'string',
			data: 'You don`t have the necessary permissions',
			response: { code: 403, status: 'Forbidden', message: 'Forbidden access' },
		});
	},
	InternalServerError: () => {
		return CreateResponse({
			data: {},
			key: 'errors',
			type: 'object',
			response: { code: 500, status: 'Internal Server Error', message: 'An unexpected server error occurred' },
		});
	},
};
