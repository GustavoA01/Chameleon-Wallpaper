'use server';
import { DeviceType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createDevice = async (
  deviceData: Omit<DeviceType, 'id' | 'isActive'>
) => {
  const newDevice = await prisma.device.create({
    data: {
      ...deviceData,
    },
  });
  revalidatePath('/');

  return newDevice;
};
