import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export const GET = async (
  _: unknown,
  { params }: { params: Promise<{ id: string }> }
) => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const image = await prisma.image.findFirst({
    where: {
      id,
      folder: { userId: user.id },
    },
  });

  if (!image) {
    return NextResponse.json(
      { error: 'Imagem não encontrada' },
      { status: 404 }
    );
  }

  return NextResponse.json(image);
};
