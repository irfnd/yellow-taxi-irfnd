import { CreateResponse as SetRes } from '../../utils/others/response.builder';

export const AuthResponses = {
	SignIn: {
		OK: () => {
			return SetRes({
				key: 'token',
				type: 'string',
				data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
				response: { code: 200, status: 'OK', message: 'You have successfully signed in' },
			});
		},
	},
	RefreshToken: {
		OK: () => {
			return SetRes({
				key: 'token',
				type: 'string',
				data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
				response: { code: 200, status: 'OK', message: 'Your token has been refreshed' },
			});
		},
	},
};
