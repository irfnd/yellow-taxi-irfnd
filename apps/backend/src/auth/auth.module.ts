import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '../common/common.module';
import { JwtRefreshStrategy } from '../jwt/jwt-refresh.strategy';
import { JwtModule } from '../jwt/jwt.module';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
	imports: [CommonModule, JwtModule, PassportModule],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
