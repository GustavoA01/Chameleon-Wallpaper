import { DeviceType } from '@/src/data/types';
import { prisma } from '@/src/lib/prisma';

export const getAllDevices = async (): Promise<DeviceType[]> => {
  const response = await prisma.device.findMany();
  return response;
};
