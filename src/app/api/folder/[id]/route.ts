import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (
  _: unknown,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  if (!id)
    return NextResponse.json({ error: 'Folder ID required' }, { status: 400 });

  const images = await prisma.image.findMany({
    where: { folderId: id },
  });

  const image = images[Math.floor(Math.random() * images.length)];

  return NextResponse.json({
    url: image?.url,
    title: image?.title,
    interval: 3600,
  });
};
