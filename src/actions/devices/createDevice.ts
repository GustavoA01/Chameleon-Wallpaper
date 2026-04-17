'use server';
import { DeviceType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';

export const createDevice = async (
  deviceData: Omit<DeviceType, 'id' | 'isActive'>
) => {
  const newDevice = await prisma.device.create({
    data: {
      ...deviceData,
    },
  });

  return newDevice;
};
