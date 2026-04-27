'use server';
import { NewDeviceType } from '@/src/features/DevicesContent/types';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createDevice = async (deviceData: NewDeviceType) => {
  const newDevice = await prisma.device.create({
    data: {
      name: deviceData.name,
      intervalSeconds: deviceData.intervalSeconds,
      selectedFolderId: deviceData.selectedFolderId,
    },
  });
  revalidatePath('/');

  return newDevice;
};
