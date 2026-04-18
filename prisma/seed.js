require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const dbUrl = process.env.DATABASE_URL || 'prisma/dev.db';
const adapter = new PrismaBetterSqlite3({ url: dbUrl.replace('file:', '') });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create Admin
  await prisma.user.upsert({
    where: { email: 'admin@guidelink.ma' },
    update: {},
    create: {
      id: 'admin-1',
      name: 'System Admin',
      email: 'admin@guidelink.ma',
      role: 'ADMIN',
    }
  });

  // Create Guide
  const guideUser = await prisma.user.upsert({
    where: { email: 'ahmed@example.com' },
    update: {},
    create: {
      id: 'guide-1',
      name: 'Ahmed R.',
      email: 'ahmed@example.com',
      role: 'GUIDE',
    }
  });

  const guideProfile = await prisma.guideProfile.upsert({
    where: { userId: guideUser.id },
    update: {},
    create: {
      userId: guideUser.id,
      city: 'Zagora',
      bio: 'Expert in desert tours and Berber heritage.',
      certificationId: 'MGC-1002',
      dailyRate: 50,
      specialties: 'Desert, Culture',
      status: 'APPROVED'
    }
  });

  // Create Traveler
  const traveler = await prisma.user.upsert({
    where: { email: 'traveler@example.com' },
    update: {},
    create: {
      id: 'traveler-1',
      name: 'John Doe',
      email: 'traveler@example.com',
      role: 'TRAVELER',
    }
  });

  // Create Booking
  await prisma.booking.upsert({
    where: { id: 'BK-001' },
    update: {},
    create: {
      id: 'BK-001',
      travelerId: traveler.id,
      guideId: guideProfile.id,
      duration: 3,
      numberOfPeople: 2,
      totalAmount: 300,
      status: 'PAID'
    }
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
