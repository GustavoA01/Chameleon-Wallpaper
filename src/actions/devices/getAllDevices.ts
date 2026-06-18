'use server';

import { DeviceType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';
import { getCurrentUser } from '@/src/lib/auth';

export const getAllDevices = async (): Promise<
  Omit<DeviceType, 'selectedFolder'>[]
> => {
  const user = await getCurrentUser();

  return prisma.device.findMany({
    where: { userId: user?.id ?? null },
  });
};
