import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const GET = async (
  _: unknown,
  { params }: { params: Promise<{ id: string }> }
) => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const folder = await prisma.folder.findFirst({
    where: { id, userId: user.id },
  });

  if (!folder) {
    return NextResponse.json(
      { error: 'Pasta não encontrada' },
      { status: 404 }
    );
  }

  const device = await prisma.device.findFirst({
    where: {
      selectedFolderId: folder.id,
      userId: user.id,
    },
  });

  if (!device) {
    return NextResponse.json(
      { error: 'Dispositivo não encontrado' },
      { status: 404 }
    );
  }

  if (!device.isActive) {
    return NextResponse.json({
      status: 'disabled',
      message: 'O dispositivo está desativado',
    });
  }

  const images = await prisma.image.findMany({
    where: { folderId: id },
  });

  if (images.length === 0) {
    return NextResponse.json(
      { error: 'Nenhuma imagem nesta pasta' },
      { status: 404 }
    );
  }

  const image = images[Math.floor(Math.random() * images.length)];

  return NextResponse.json({
    url: image.url,
    interval: device.intervalSeconds,
  });
};
