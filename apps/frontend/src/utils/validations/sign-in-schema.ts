import { z } from 'zod';

export const signInSchema = z.object({
	email: z.string().min(1, { message: 'Email is required' }).email({ message: 'invalid email address' }),
	password: z.string().min(1, { message: 'Password is required' }),
});

export type SignInType = z.infer<typeof signInSchema>;
