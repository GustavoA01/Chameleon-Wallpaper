'use server';
import { DeviceType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateDeviceSettings({
  id,
  ...data
}: Partial<DeviceType> & { id: string }) {
  try {
    const updated = await prisma.device.update({
      where: { id },
      data: {
        id,
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
