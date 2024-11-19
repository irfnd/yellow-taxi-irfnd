import { ApiProperty } from '@nestjs/swagger';
import * as Validators from 'class-validator';

export class Auth {
	@ApiProperty({
		name: 'token',
		type: String,
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMjIxZmJmOS04YmYwLTRlOGYtYTY0Ny0yMGQ1MDZjYTYxNGEiLCJlbWFpbCI6ImFkbWluaXN0cmF0b3JAbWFpbC5jb20iLCJmdWxsbmFtZSI6IkFkbWluaXN0cmF0b3IiLCJuaWNrbmFtZSI6ImFkbWluIiwiaWF0IjoxNzI2NDAwODg5LCJleHAiOjE3MjY0ODcyODl9.e_EquO4VdBfMY0McszLvxFJNKRjFt7qQ8fTmroMAMu9',
	})
	token: string;
}

export class SignInDto {
	@Validators.IsEmail({}, { message: 'invalid email' })
	@Validators.IsNotEmpty({ message: 'email is required' })
	@ApiProperty({ name: 'email', type: String, example: 'administrator@mail.com' })
	email: string;

	@Validators.IsString()
	@Validators.IsNotEmpty({ message: 'password is required' })
	@ApiProperty({ name: 'password', type: String, example: 'Admin123.' })
	password: string;
}
