import { prisma } from '@/src/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const deviceId = request.nextUrl.searchParams.get('deviceId');
  const where = deviceId
    ? {
        consumedAt: null,
        OR: [{ deviceId: null }, { deviceId }],
      }
    : {
        consumedAt: null,
        deviceId: null,
      };

  const command = await prisma.wallpaperCommand.findFirst({
    where,
    orderBy: { createdAt: 'asc' },
  });

  if (!command) {
    return NextResponse.json({ command: null });
  }

  await prisma.wallpaperCommand.update({
    where: { id: command.id },
    data: { consumedAt: new Date() },
  });

  return NextResponse.json({ command });
};
