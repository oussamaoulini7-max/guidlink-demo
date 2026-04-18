import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guideUserId = searchParams.get('userId');

  if (!guideUserId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  try {
    const profile = await prisma.guideProfile.findUnique({
      where: { userId: guideUserId },
      include: {
        bookings: {
          include: { traveler: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const earnings = profile.bookings.reduce((sum, b) => sum + b.totalAmount, 0);

    return NextResponse.json({
      profile,
      stats: {
        activeBookings: profile.bookings.filter(b => b.status === 'PAID').length,
        totalEarnings: earnings,
        rating: 4.9, // Mocked
        travelers: profile.bookings.length
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch guide data' }, { status: 500 });
  }
}
