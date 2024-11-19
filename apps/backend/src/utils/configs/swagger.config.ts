import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function UseSwagger(app: INestApplication<any>, url: string, port: number) {
	const config = new DocumentBuilder()
		.setTitle('Yellow Taxi Trip API')
		.setDescription('API Documentation for Yellow Taxi Trip Analytics Dashboard')
		.setVersion('1.0')
		.addServer(`http://localhost:${port}`, 'Development server')
		.addServer(url, 'Production server')
		.addBearerAuth()
		.addTag('Auth', 'Authentication')
		.addTag('Trips', 'Trip management')
		.build();
	const docs = SwaggerModule.createDocument(app, config);

	app.use(
		'/docs',
		apiReference({
			theme: 'kepler',
			hideModels: true,
			tagsSorter: 'alpha',
			forceDarkModeState: 'dark',
			defaultOpenAllTags: true,
			spec: { content: docs },
			favicon: 'https://docs.scalar.com/favicon.svg',
			defaultHttpClient: { targetKey: 'node', clientKey: 'fetch' },
			metaData: {
				title: 'Yellow Taxi Trip API',
				description: 'API Documentation for Yellow Taxi Trip Analytics Dashboard',
			},
		})
	);
}
