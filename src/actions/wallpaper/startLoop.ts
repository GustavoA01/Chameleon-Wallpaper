'use server';

import { requireUser } from '@/src/lib/auth';

export const startLoop = async () => {
  await requireUser();
  return { success: true };
};
