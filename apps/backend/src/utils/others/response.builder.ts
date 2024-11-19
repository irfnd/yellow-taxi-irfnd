import { applyDecorators, Type } from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';
import { BaseResponseDetails, BaseResponseTypes, SchemaObjectAllOf } from '../types/responses.type';

function isDto<T>(obj: any): obj is Type<T> {
	return typeof obj === 'function' && obj.prototype && obj.prototype.constructor === obj;
}

function createSchemaAllOf(
	key: string,
	type: string,
	data: BaseResponseTypes,
	response: BaseResponseDetails
): SchemaObjectAllOf {
	const isObjectDto = type === 'object' && isDto(data);
	const isArrayDto = type === 'array' && isDto(data);
	const schemaKey = key || 'results';

	const schemaList: SchemaObjectAllOf = [
		{
			type: 'object',
			required: ['success', 'statusCode', 'message'],
			properties: {
				code: { type: 'boolean', example: response.code },
				status: { type: 'number', example: response.status },
				message: { type: 'string', example: response.message },
			},
		},
	];
	const schemaExtended = { required: [schemaKey], properties: { [schemaKey]: {} } };

	if (isObjectDto) schemaExtended.properties[schemaKey] = { $ref: Swagger.getSchemaPath(data) };
	else if (isArrayDto) schemaExtended.properties[schemaKey] = { type, items: { $ref: Swagger.getSchemaPath(data) } };
	else schemaExtended.properties[schemaKey] = { type, example: data };

	return [...schemaList, schemaExtended];
}

export function CreateResponse<T extends BaseResponseTypes>(options: {
	data: T;
	key: string;
	type: 'object' | 'array' | 'string' | 'number' | 'boolean';
	response: BaseResponseDetails;
}) {
	const { data, key, type, response } = options;
	const schemaList = createSchemaAllOf(key, type, data, response);
	const extraModels: Type<any>[] = [];

	if (isDto(data)) extraModels.push(data as Type<any>);
	return applyDecorators(
		Swagger.ApiExtraModels(...extraModels),
		Swagger.ApiResponse({
			status: response.code,
			description: response.status === 'Ok' ? 'OK' : response.status,
			schema: { allOf: schemaList },
		})
	);
}
