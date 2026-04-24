import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (
  _: unknown,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const image = prisma.image.findFirst({
    where: { id },
  });

  if (!image)
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });

  return NextResponse.json(image);
};
