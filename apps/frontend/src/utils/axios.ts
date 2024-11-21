import { getStoredUser, setStoredUser } from '@/components/providers/auth-provider';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL as string;
const api = axios.create({ baseURL });

api.interceptors.request.use(
	(config) => {
		const user = getStoredUser();
		if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const user = getStoredUser();
			if (user?.token) {
				try {
					const headers = { Authorization: `Bearer ${user.token}` };
					const response = await axios.get(`${baseURL}/refresh-token`, { headers });
					const newToken = response.data?.token;
					setStoredUser({ ...user, token: newToken });
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
					return axios(originalRequest);
				} catch (error) {
					setStoredUser(null);
				}
			}
		}
		return Promise.reject(error);
	}
);

export { api };
