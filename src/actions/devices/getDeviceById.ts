'use server';

import { DeviceType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';
import { requireUser } from '@/src/lib/auth';

export const getDeviceById = async (
  id: string
): Promise<Omit<DeviceType, 'selectedFolder'> | null> => {
  const user = await requireUser();

  return prisma.device.findFirst({
    where: { id, userId: user.id },
  });
};
