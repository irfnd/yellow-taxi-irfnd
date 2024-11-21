import { AuthContext } from '@/components/providers/auth-provider';
import { api } from '@/utils/axios';
import { JwtPayloadUser } from '@/utils/types/auth-type';
import { SignInType } from '@/utils/validations/sign-in-schema';
import axios from 'axios';
import { pick } from 'es-toolkit';
import { jwtDecode } from 'jwt-decode';

export const signInReq = async (data: SignInType, handler: AuthContext['signIn']) => {
	try {
		const response = await api.post('/sign-in', data);
		const result = response.data;
		const userData = pick(jwtDecode<JwtPayloadUser>(result.token), ['sub', 'email', 'fullname']);
		handler({ ...userData, token: result.token });
		return result;
	} catch (error) {
		if (axios.isAxiosError(error)) return error.response?.data;
		return error;
	}
};
