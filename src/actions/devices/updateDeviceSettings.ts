'use server';

import { DeviceType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';
import { requireUser } from '@/src/lib/auth';
import { requireOwnedDevice, requireOwnedFolder } from '@/src/lib/ownership';
import { revalidatePath } from 'next/cache';

export async function updateDeviceSettings({
  id,
  ...data
}: Partial<DeviceType> & { id: string }) {
  try {
    const user = await requireUser();
    await requireOwnedDevice(user.id, id);

    if (data.selectedFolderId) {
      await requireOwnedFolder(user.id, data.selectedFolderId);
    }

    const updated = await prisma.device.update({
      where: { id },
      data: {
        isActive: data.isActive,
        intervalSeconds: data.intervalSeconds,
        selectedFolderId: data.selectedFolderId,
      },
    });

    revalidatePath('/');
    return updated;
  } catch (error) {
    console.error(error);
    throw new Error('Falha ao atualizar');
  }
}
