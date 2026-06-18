'use server';

import { prisma } from '@/src/lib/prisma';
import { requireUser } from '@/src/lib/auth';

export const updateInterval = async (intervalSeconds: number) => {
  const user = await requireUser();

  await prisma.wallpaperCommand.create({
    data: {
      type: 'UPDATE_INTERVAL',
      interval: intervalSeconds,
      resetTimer: true,
      userId: user.id,
    },
  });

  return { success: true };
};
