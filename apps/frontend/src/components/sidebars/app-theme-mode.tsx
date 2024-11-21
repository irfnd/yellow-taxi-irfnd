import { useTheme } from '@/components/providers/theme-provider';
import { Button } from '@/components/ui/button';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function AppThemeMode() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<Button
			className='ml-auto rounded-lg'
			variant='outline'
			size='icon'
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
		>
			{theme === 'light' ? <IconMoon /> : <IconSun />}
		</Button>
	);
}
