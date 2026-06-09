import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@oluku.edu.ng' },
    update: {},
    create: {
      email: 'admin@oluku.edu.ng',
      password: 'adminpassword123', // Remember to hash this if your auth expects hashes!
      role: 'ADMIN',
      adminProfile: {
        create: {
          adminName: 'Chief Administrator',
        }
      }
    },
  })
  console.log({ admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })