'use server';

import { requireUser } from '@/src/lib/auth';

export const stopLoop = async () => {
  await requireUser();
  return { success: true };
};
