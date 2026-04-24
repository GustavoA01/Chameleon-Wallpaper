'use server';
import { DeviceType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateDeviceSettings = async (data: Partial<DeviceType>) => {
  const updatedDevice = await prisma.device.update({
    where: { id: data.id },
    data: {
      ...data,
    },
  });
  revalidatePath('/');

  return updatedDevice;
};
