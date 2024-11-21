import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function seed() {
	const password = await argon2.hash('YellowTaxi@2024');
	await prisma.users.upsert({
		where: { email: 'admin@mail.com' },
		update: { fullname: 'Administrator', email: 'admin@mail.com', password },
		create: { fullname: 'Administrator', email: 'admin@mail.com', password },
	});
}

seed()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
