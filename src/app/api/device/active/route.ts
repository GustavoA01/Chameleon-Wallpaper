import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const device = await prisma.device.findFirst({
    where: { isActive: true },
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
      { error: 'Nenhum dispositivo ativo encontrado' },
      { status: 404 }
    );
  }

  const images = device.selectedFolder.images;

  if (images.length === 0) {
    return NextResponse.json(
      { error: 'Nenhuma imagem na pasta selecionada' },
      { status: 404 }
    );
  }

  const randomImage = images[Math.floor(Math.random() * images.length)];

  return NextResponse.json({
    deviceId: device.id,
    url: randomImage.url,
    interval: device.intervalSeconds,
    isActive: device.isActive,
  });
};
