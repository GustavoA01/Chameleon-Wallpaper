'use server';

import { NewDeviceType } from '@/src/features/DevicesContent/types';
import { prisma } from '@/src/lib/prisma';
import { requireUser } from '@/src/lib/auth';
import { requireOwnedFolder } from '@/src/lib/ownership';
import { revalidatePath } from 'next/cache';

export const createDevice = async (deviceData: NewDeviceType) => {
  const user = await requireUser();
  await requireOwnedFolder(user.id, deviceData.selectedFolderId);

  const newDevice = await prisma.device.create({
    data: {
      name: deviceData.name,
      intervalSeconds: deviceData.intervalSeconds,
      selectedFolderId: deviceData.selectedFolderId,
      userId: user.id,
    },
  });

  revalidatePath('/');
  return newDevice;
};
