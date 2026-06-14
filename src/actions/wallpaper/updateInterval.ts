'use server';

import { prisma } from '@/src/lib/prisma';

export const updateInterval = async (intervalSeconds: number) => {
  await prisma.wallpaperCommand.create({
    data: {
      type: 'UPDATE_INTERVAL',
      interval: intervalSeconds,
      resetTimer: true,
    },
  });

  return { success: true };
};
