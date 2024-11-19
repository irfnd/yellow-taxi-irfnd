import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { startCase } from 'es-toolkit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../types/responses.type';

export function UseTransformInterceptor() {
	@Injectable()
	class TransformInterceptor<T> implements NestInterceptor<T, BaseResponse> {
		intercept(ctx: ExecutionContext, next: CallHandler<T>): Observable<BaseResponse> {
			const code = ctx.switchToHttp().getResponse().statusCode;
			return next.handle().pipe(
				map((data) => {
					const { message, ...other } = data as { message: string; [key: string]: any };
					return { code, status: startCase(HttpStatus[code]), message, ...other };
				})
			);
		}
	}
	return new TransformInterceptor();
}
