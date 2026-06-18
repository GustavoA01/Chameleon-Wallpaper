'use client';
import { DevicesDialogContent } from '../components/DevicesDialogContent';
import { TabHeader } from '@/src/components/TabHeader';
import { Dialog } from '@/src/components/ui/dialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DeviceHeaderProps } from '../types';

export const DevicesHeader = ({
  folders,
  isAuthenticated,
}: DeviceHeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get('action');
  const [openDialog, setOpenDialog] = useState(
    isAuthenticated && action === 'add-device'
  );

  const handleAdd = () => {
    if (!isAuthenticated) {
      router.push('/login?next=%2F%3Ftab%3Ddevices%26action%3Dadd-device');
      return;
    }
    setOpenDialog(true);
  };

  const handleOpenChange = (open: boolean) => {
    setOpenDialog(open);
    if (!open && action === 'add-device') router.replace('/?tab=devices');
  };

  return (
    <>
      <TabHeader
        description="Gerencie seus dispositivos e escolha quais imagens devem ser usadas como papéis de parede"
        buttonText="Adicionar dispositivo"
        onClick={handleAdd}
      />
      <Dialog open={openDialog} onOpenChange={handleOpenChange}>
        <DevicesDialogContent
          folders={folders}
          setIsDialogOpen={handleOpenChange}
        />
      </Dialog>
    </>
  );
};
