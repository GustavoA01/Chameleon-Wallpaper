import { NextRequest, NextResponse } from 'next/server';
import { isAgentAuthorized } from '@/src/lib/agent-auth';
import { prisma } from '@/src/lib/prisma';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  if (!isAgentAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const device = await prisma.device.findUnique({
    where: { id },
    include: {
      selectedFolder: {
        include: { images: true },
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
