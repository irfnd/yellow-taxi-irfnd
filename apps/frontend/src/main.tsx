import '@/main.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthProvider } from '@/components/providers/auth-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { RouterProvider } from '@/components/providers/router-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<AuthProvider>
				<QueryProvider>
					<RouterProvider />
				</QueryProvider>
			</AuthProvider>
		</ThemeProvider>
	</StrictMode>
);
