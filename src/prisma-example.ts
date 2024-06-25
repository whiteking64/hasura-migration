import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  });
  console.log('Created new user:', newUser);

  // Retrieve all users
  const users = await prisma.user.findMany();
  console.log('All users:', users);

  // Update a user
  const updatedUser = await prisma.user.update({
    where: { id: newUser.id },
    data: { name: 'John Smith' },
  });
  console.log('Updated user:', updatedUser);

  // Delete a user
//   await prisma.user.delete({ where: { id: newUser.id } });
//   console.log('Deleted user');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
