import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UseSwagger } from './utils/configs/swagger.config';
import { UseAllExceptionsFilter } from './utils/filters/all-exceptions.filter';
import { UseTransformInterceptor } from './utils/interceptors/transform.interceptor';
import { UseValidationPipe } from './utils/pipes/validation.pipe';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const adapter = app.get(HttpAdapterHost).httpAdapter;
	const config = app.get(ConfigService);
	const port = config.get<number>('PORT') || 3000;
	const url = config.get<string>('URL') || 'https://domain-production.com';

	app.enableCors({ origin: '*' });
	app.useGlobalPipes(UseValidationPipe());
	app.useGlobalInterceptors(UseTransformInterceptor());
	app.useGlobalFilters(UseAllExceptionsFilter(adapter));

	UseSwagger(app, url, port);

	await app.listen(port);
}
bootstrap();
