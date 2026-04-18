import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) {
    return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
  }

  try {
    const messages = await prisma.chatMessage.findMany({
      where: { bookingId },
      orderBy: { createdAt: 'asc' },
      include: { sender: true },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Fetch chat error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { bookingId, senderId, content } = await request.json();

    if (!bookingId || !senderId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Ensure traveler and booking exist for the demo
    await prisma.user.upsert({
      where: { id: senderId },
      update: {},
      create: { 
        id: senderId, 
        name: 'Demo Traveler', 
        email: `${senderId}@example.com`,
        role: 'TRAVELER'
      }
    });

    // Ensure a default guide profile exists
    const guideUser = await prisma.user.upsert({
      where: { email: 'ahmed@example.com' },
      update: {},
      create: {
        id: 'guide-1',
        name: 'Ahmed R.',
        email: 'ahmed@example.com',
        role: 'GUIDE'
      }
    });

    const guideProfile = await prisma.guideProfile.upsert({
      where: { userId: guideUser.id },
      update: {},
      create: {
        userId: guideUser.id,
        city: 'Zagora',
        bio: 'Local expert',
        certificationId: 'MGC-1002',
        dailyRate: 50,
        specialties: 'Desert'
      }
    });

    await prisma.booking.upsert({
      where: { id: bookingId },
      update: {},
      create: {
        id: bookingId,
        travelerId: senderId,
        guideId: guideProfile.id,
        duration: 1,
        numberOfPeople: 1,
        totalAmount: 50,
        status: 'PAID'
      }
    });

    const newMessage = await prisma.chatMessage.create({
      data: {
        bookingId,
        senderId,
        content,
      },
      include: { sender: true },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Save chat error:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
