'use client';
import { TabHeader } from '@/src/components/TabHeader';
import { Dialog, DialogContent } from '@/src/components/ui/dialog';
import { useState } from 'react';

export const FolderHeader = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <TabHeader
        description="Gerencie suas pastas e escolha quais imagens devem ser usadas como papéis de parede"
        buttonText="Adicionar pasta"
        onClick={() => setOpenDialog(true)}
      />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>teste pasta</DialogContent>
      </Dialog>
    </>
  );
};
