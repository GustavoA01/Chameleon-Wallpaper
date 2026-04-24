import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (
  _: unknown,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  if (!id)
    return NextResponse.json({ error: 'Device ID required' }, { status: 400 });

  const device = await prisma.device.findUnique({
    where: { id },
  });

  if (!device)
    return NextResponse.json({ error: 'Device not found' }, { status: 404 });

  return NextResponse.json(device);
};
