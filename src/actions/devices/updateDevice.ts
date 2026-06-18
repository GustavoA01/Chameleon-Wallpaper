'use server';

import { DeviceFormData } from '@/src/data/schemas';
import { prisma } from '@/src/lib/prisma';
import { requireUser } from '@/src/lib/auth';
import { requireOwnedDevice, requireOwnedFolder } from '@/src/lib/ownership';
import { revalidatePath } from 'next/cache';

export const updateDevice = async (
  id: string,
  data: Omit<DeviceFormData, 'intervalSeconds'>
) => {
  const user = await requireUser();
  await requireOwnedDevice(user.id, id);
  await requireOwnedFolder(user.id, data.selectedFolderId);

  const updatedDevice = await prisma.device.update({
    where: { id },
    data,
  });

  revalidatePath('/');
  return updatedDevice;
};
