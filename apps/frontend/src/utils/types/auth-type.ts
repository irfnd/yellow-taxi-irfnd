import { JwtPayload } from 'jwt-decode';

export interface JwtPayloadUser extends JwtPayload {
	sub: string;
	email: string;
	fullname: string;
}

export interface UserData extends JwtPayloadUser {
	token: string;
}
