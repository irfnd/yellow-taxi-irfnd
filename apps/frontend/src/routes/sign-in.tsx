import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInReq } from '@/utils/others/auth-request';
import { sleep } from '@/utils/others/tools';
import { redirectSchema } from '@/utils/validations/route-schema';
import { signInSchema, SignInType } from '@/utils/validations/sign-in-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDocumentTitle } from '@mantine/hooks';
import { IconCar, IconEye, IconEyeClosed, IconLoader2 } from '@tabler/icons-react';
import { createFileRoute, redirect, useRouter, useRouterState } from '@tanstack/react-router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const Route = createFileRoute('/sign-in')({
	validateSearch: redirectSchema,
	beforeLoad: ({ context, search }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({ to: search.redirect || '/' });
		}
	},
	component: SignInComponent,
	staticData: { name: 'Sign in', title: 'Sign In | Yellow Taxi' },
});

function SignInComponent() {
	const match = Route.useMatch();
	useDocumentTitle(match.staticData.title!);

	const { signIn } = useAuth();
	const router = useRouter();
	const isLoading = useRouterState({ select: (s) => s.isLoading });
	const navigate = Route.useNavigate();
	const search = Route.useSearch();

	const [signInState, setSignInState] = React.useState({ loading: false, showPassword: false });
	const form = useForm<SignInType>({ resolver: zodResolver(signInSchema), defaultValues: { email: '', password: '' } });

	const togglePassVisibility = () => setSignInState((state) => ({ ...state, showPassword: !state.showPassword }));
	const onSubmit = async (values: SignInType) => {
		setSignInState((state) => ({ ...state, loading: true }));
		const response = await signInReq(values, signIn);
		if (response.code === 200) {
			toast.success(response.message, { description: 'Redirecting to dashboard' });
			await router.invalidate();
			await sleep(1000);
			await navigate({ to: search.redirect || '/' });
		} else if (response.code === 400) {
			toast.error(response.message, { description: 'Email/Password not match' });
		}
		setSignInState((state) => ({ ...state, loading: false }));
	};

	const isSignIn = isLoading || signInState.loading;

	return (
		<div className='flex justify-center items-center min-h-dvh w-full bg-background'>
			<Card className='min-w-[360px]'>
				<CardHeader className='flex flex-row gap-4 item-center'>
					<IconCar size={55} className='text-primary -rotate-[12deg]' />
					<div>
						<CardTitle className='text-xl'>Yellow Taxi</CardTitle>
						<CardDescription>Sign in to access the dashboard.</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form id='sign-in-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder='name@mail.com' disabled={isSignIn} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className='relative'>
												<Input
													type={signInState.showPassword ? 'text' : 'password'}
													placeholder={signInState.showPassword ? 'your-password' : '**********'}
													disabled={isSignIn}
													{...field}
												/>
												<div className='absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground cursor-pointer'>
													{signInState.showPassword ? (
														<IconEye className='h-5 w-5' onClick={togglePassVisibility} />
													) : (
														<IconEyeClosed className='h-5 w-5' onClick={togglePassVisibility} />
													)}
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</CardContent>
				<CardFooter className='mt-2'>
					<Button className='w-full' form='sign-in-form' type='submit' disabled={isSignIn}>
						{isSignIn && <IconLoader2 className='animate-spin' />}
						Sign in
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
