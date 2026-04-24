import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (
  _: unknown,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  if (!id)
    return NextResponse.json({ error: 'Folder ID required' }, { status: 400 });

  const folder = await prisma.folder.findUnique({
    where: {
      id,
    },
  });

  if (!folder)
    return NextResponse.json(
      { error: 'Pasta não encontrada' },
      { status: 404 }
    );

  const device = await prisma.device.findFirst({
    where: {
      selectedFolderId: folder.id,
    },
  });

  if (!device)
    return NextResponse.json({ error: 'Device not found' }, { status: 404 });

  if (!device.isActive) {
    return NextResponse.json({
      status: 'disabled',
      message: 'O dispositivo está desativado',
    });
  }

  const images = await prisma.image.findMany({
    where: { folderId: id },
  });

  if (images.length === 0)
    return NextResponse.json(
      { error: 'Nenhuma imagem nesta pasta' },
      { status: 404 }
    );

  const image = images[Math.floor(Math.random() * images.length)];

  return NextResponse.json({
    url: image?.url,
    title: image?.title,
    interval: device?.intervalSeconds || 3600,
  });
};
