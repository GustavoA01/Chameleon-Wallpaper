import { NextRequest, NextResponse } from 'next/server';
import { isAgentAuthorized } from '@/src/lib/agent-auth';
import { prisma } from '@/src/lib/prisma';

export const GET = async (request: NextRequest) => {
  if (!isAgentAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const deviceId = request.nextUrl.searchParams.get('deviceId');

  if (!deviceId) {
    return NextResponse.json(
      { error: 'deviceId is required' },
      { status: 400 }
    );
  }

  const device = await prisma.device.findUnique({
    where: { id: deviceId },
  });

  if (!device?.userId)
    return NextResponse.json({ error: 'Device not found' }, { status: 404 });

  const command = await prisma.wallpaperCommand.findFirst({
    where: {
      userId: device.userId,
      consumedAt: null,
      OR: [{ deviceId: null }, { deviceId }],
    },
    orderBy: { createdAt: 'asc' },
  });

  if (!command) return NextResponse.json({ command: null });

  await prisma.wallpaperCommand.update({
    where: { id: command.id },
    data: { consumedAt: new Date() },
  });

  return NextResponse.json({ command });
};
