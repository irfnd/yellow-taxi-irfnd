import { sleep } from '@/utils/others/tools';
import { UserData } from '@/utils/types/auth-type';
import * as React from 'react';

export interface AuthContext {
	isAuthenticated: boolean;
	userData: UserData | null;
	signIn: (data: UserData) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function getStoredUser() {
	const getUser = localStorage.getItem('_auth');
	return getUser ? JSON.parse(decodeURI(getUser)) : null;
}

export function setStoredUser(user: AuthContext['userData']) {
	if (user) localStorage.setItem('_auth', encodeURI(JSON.stringify(user)));
	else localStorage.removeItem('_auth');
}

export function AuthProvider({ children }: { children: Readonly<React.ReactNode> }) {
	const [userData, setUserData] = React.useState<AuthContext['userData']>(getStoredUser());
	const isAuthenticated = !!userData;

	const signIn = React.useCallback(async (data: UserData) => {
		await sleep(500);
		setStoredUser(data);
		setUserData(data);
	}, []);

	const logout = React.useCallback(async () => {
		await sleep(250);
		setStoredUser(null);
		setUserData(null);
	}, []);

	React.useEffect(() => {
		setUserData(getStoredUser());
	}, []);

	return <AuthContext.Provider value={{ isAuthenticated, userData, signIn, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = React.useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider');
	return context;
}
