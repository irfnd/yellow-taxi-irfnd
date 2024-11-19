import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashingService {
	async hashPassword(password: string) {
		return await argon2.hash(password);
	}

	async verifyPassword(hash: string, password: string) {
		return await argon2.verify(hash, password);
	}
}
