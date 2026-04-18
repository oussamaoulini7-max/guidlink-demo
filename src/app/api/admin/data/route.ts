import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const totalRevenue = await prisma.booking.aggregate({
      _sum: { totalAmount: true }
    });
    
    const totalGuides = await prisma.guideProfile.count();
    const pendingGuides = await prisma.guideProfile.findMany({
      where: { status: 'PENDING' },
      include: { user: true }
    });
    
    const redirectionLogs = await prisma.redirectionLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const stats = {
      revenue: totalRevenue._sum.totalAmount || 0,
      guides: totalGuides,
      redirections: redirectionLogs.length,
      mitigation: "24%" // Mocked impact
    };

    return NextResponse.json({ stats, pendingGuides, redirectionLogs });
  } catch (error) {
    console.error('Admin data fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { guideId, action } = await request.json(); // action: 'APPROVE' or 'REJECT'
    
    const status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
    
    await prisma.guideProfile.update({
      where: { id: guideId },
      data: { status }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
