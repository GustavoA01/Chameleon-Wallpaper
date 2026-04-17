'use client';
import { DevicesDialogContent } from '../components/DevicesDialogContent';
import { TabHeader } from '@/src/components/TabHeader';
import { Dialog } from '@/src/components/ui/dialog';
import { FolderType } from '@/src/data/types';
import { useState } from 'react';

export const DevicesHeader = ({
  folders,
}: {
  folders: Omit<FolderType, 'images'>[];
}) => {
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
