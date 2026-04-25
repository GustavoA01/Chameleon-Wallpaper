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
    include: {
      selectedFolder: {
        include: {
          images: true,
        },
      },
    },
  });

  if (!device || !device.selectedFolder) {
    return NextResponse.json(
      { error: 'Configuração incompleta' },
      { status: 404 }
    );
  }

  const images = device.selectedFolder.images;

  const randomImage = images[Math.floor(Math.random() * images.length)];

  const response = {
    url: randomImage.url,
    interval: device.intervalSeconds,
    isActive: device.isActive,
  };

  return NextResponse.json(response);
};
