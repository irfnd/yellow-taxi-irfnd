import { Type } from '@nestjs/common';
import { ApiResponseSchemaHost } from '@nestjs/swagger';

export interface BaseResponse {
	code: number;
	status: string;
	message: string;
	[key: string]: any;
}

export type SchemaObjectAllOf = ApiResponseSchemaHost['schema']['allOf'];
export type BaseResponseTypes = Type<any> | object | Array<any> | string | number | boolean;
export type BaseResponseDetails = Pick<BaseResponse, 'code' | 'status' | 'message'>;
