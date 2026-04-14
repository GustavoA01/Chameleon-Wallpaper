'use client';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const { back } = useRouter();

  return (
    <Button variant="outline" className="rounded-full" onClick={back}>
      <ArrowLeft />
    </Button>
  );
};
