'use client';
import { DevicesDialogContent } from '../components/DevicesDialogContent';
import { TabHeader } from '@/src/components/TabHeader';
import { Dialog } from '@/src/components/ui/dialog';
import { useState } from 'react';
import { DeviceHeaderProps } from '../types';

export const DevicesHeader = ({ folders }: DeviceHeaderProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <TabHeader
        description="Gerencie seus dispositivos e escolha quais imagens devem ser usadas como papéis de parede"
        buttonText="Adicionar dispositivo"
        onClick={() => setOpenDialog(true)}
      />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DevicesDialogContent
          folders={folders}
          setIsDialogOpen={setOpenDialog}
        />
      </Dialog>
    </>
  );
};
