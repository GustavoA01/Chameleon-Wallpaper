'use server';

import { prisma } from '@/src/lib/prisma';
import { requireUser } from '@/src/lib/auth';

export const selectImage = async (url: string) => {
  const user = await requireUser();
  const image = await prisma.image.findFirst({
    where: {
      url,
      folder: { userId: user.id },
    },
  });

  if (!image) throw new Error('Imagem não encontrada');

  await prisma.wallpaperCommand.create({
    data: {
      type: 'SELECT_IMAGE',
      url,
      resetTimer: false,
      userId: user.id,
    },
  });

  return { success: true };
};
