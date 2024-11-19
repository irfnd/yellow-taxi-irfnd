import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpProvider implements HttpModuleOptionsFactory {
	constructor(private readonly config: ConfigService) {}

	createHttpOptions(): HttpModuleOptions {
		return {
			baseURL: this.config.get<string>('DATASET_URL'),
		};
	}
}
