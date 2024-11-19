import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { AxiosError } from 'axios';
import { startCase } from 'es-toolkit';
import { BaseResponse } from '../types/responses.type';

export function UseAllExceptionsFilter(httpAdapterHost: AbstractHttpAdapter) {
	@Catch()
	class AllExceptionsFilter implements ExceptionFilter {
		constructor(public readonly httpAdapterHost: AbstractHttpAdapter) {}

		public readonly logger = new Logger(AllExceptionsFilter.name);

		catch(exception: unknown, host: ArgumentsHost) {
			const httpAdapter = this.httpAdapterHost;
			const ctx = host.switchToHttp();

			const responseBody: BaseResponse = {
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				status: 'Internal Server Error',
				message: 'An unexpected server error occurred',
				errors: {},
			};

			console.log(exception);

			// Global exception
			if (exception instanceof HttpException) {
				responseBody.code = exception.getStatus();
				responseBody.status = startCase(HttpStatus[responseBody.code]);
				responseBody.message = exception.getResponse()['message'] || exception.message;
				responseBody.errors = exception.getResponse()['error'] || exception.cause || {};
			}

			// Axios exception
			if (exception instanceof AxiosError) {
				const { response, message } = exception;
				const { status, data } = response;
				responseBody.code = status || HttpStatus.INTERNAL_SERVER_ERROR;
				responseBody.status = startCase(HttpStatus[responseBody.code]);
				responseBody.message = data.message || message;
				responseBody.errors = data.errors || {};
			}

			// Log error
			this.logger.error(`Status: ${responseBody.status}, Message: ${responseBody.message}`);
			httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.code);
		}
	}

	return new AllExceptionsFilter(httpAdapterHost);
}
