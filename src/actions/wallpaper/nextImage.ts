'use server';

import { prisma } from '@/src/lib/prisma';
import { requireUser } from '@/src/lib/auth';

export const nextImage = async (folderId: string) => {
  const user = await requireUser();
  const device = await prisma.device.findFirst({
    where: {
      selectedFolderId: folderId,
      isActive: true,
      userId: user.id,
    },
  });

  if (!device) {
    return { error: 'Dispositivo não encontrado ou inativo' };
  }

  const images = await prisma.image.findMany({
    where: {
      folderId,
      folder: { userId: user.id },
    },
  });

  if (images.length === 0) {
    return { error: 'Nenhuma imagem nesta pasta' };
  }

  const image = images[Math.floor(Math.random() * images.length)];

  await prisma.wallpaperCommand.create({
    data: {
      type: 'NEXT_IMAGE',
      url: image.url,
      interval: device.intervalSeconds,
      resetTimer: true,
      deviceId: device.id,
      userId: user.id,
    },
  });

  return { success: true };
};
