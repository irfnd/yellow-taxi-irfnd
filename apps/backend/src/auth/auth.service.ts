import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '../common/hashing.service';
import { PrismaService } from '../common/prisma.service';
import { SignInDto } from './dto/auth-entity.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly hashing: HashingService
	) {}

	async login(data: SignInDto) {
		const user = await this.prisma.users.findFirst({ where: { email: data.email } });
		if (user) {
			const passwordMatch = await this.hashing.verifyPassword(user.password, data.password);
			if (passwordMatch) {
				const { id: sub, email, fullname } = user;
				return await this.jwt.signAsync({ sub, email, fullname });
			}
		}
		throw new BadRequestException('Invalid credentials');
	}
}
