'use server';

import { prisma } from '@/src/lib/prisma';
import { requireUser } from '@/src/lib/auth';
import { requireOwnedDevice } from '@/src/lib/ownership';
import { revalidatePath } from 'next/cache';

export const deleteDevice = async (deviceId: string) => {
  const user = await requireUser();
  await requireOwnedDevice(user.id, deviceId);

  const deletedDevice = await prisma.device.delete({
    where: { id: deviceId },
  });

  revalidatePath('/');
  return deletedDevice;
};
