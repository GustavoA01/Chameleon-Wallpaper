'use server';

import { prisma } from '@/src/lib/prisma';

export const nextImage = async (folderId: string) => {
  const device = await prisma.device.findFirst({
    where: {
      selectedFolderId: folderId,
      isActive: true,
    },
  });

  if (!device) {
    return { error: 'Device not found or inactive' };
  }

  const images = await prisma.image.findMany({
    where: { folderId },
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
    },
  });

  return { success: true };
};
