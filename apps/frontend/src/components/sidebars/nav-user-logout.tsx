import { useAuth } from '@/components/providers/auth-provider';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { sleep } from '@/utils/others/tools';
import { IconLogout, IconX } from '@tabler/icons-react';
import { useRouter } from '@tanstack/react-router';
import * as React from 'react';
import { toast } from 'sonner';

interface Props {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NavUserLogout({ visible, setVisible }: Props) {
	const [logoutLoading, setLogoutLoading] = React.useState(false);
	const router = useRouter();
	const { logout } = useAuth();

	const handleLogout = async () => {
		setLogoutLoading(true);
		try {
			await logout();
			toast.success('You have been logged out successfully', { description: 'You will be redirected to the sign in page.' });
			await router.invalidate();
			await sleep(1000);
			await router.navigate({ to: '/sign-in' });
		} catch (error) {
			toast.error('Failed to logout', { description: "We couldn't log you out. Please try again." });
		} finally {
			setLogoutLoading(false);
		}
	};

	return (
		<AlertDialog open={visible} onOpenChange={(open) => setVisible(open)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure to logout?</AlertDialogTitle>
					<AlertDialogDescription>
						This action will remove your session. You will be logged out and redirected to the sign in page.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={logoutLoading}>
						<IconX />
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction variant='destructive' onClick={handleLogout} disabled={logoutLoading}>
						<IconLogout />
						Logout
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
