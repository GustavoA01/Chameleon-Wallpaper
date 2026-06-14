'use server';

import { prisma } from '@/src/lib/prisma';

export const selectImage = async (url: string) => {
  await prisma.wallpaperCommand.create({
    data: {
      type: 'SELECT_IMAGE',
      url,
      resetTimer: false,
    },
  });

  return { success: true };
};
