'use client';
import { TabHeader } from '@/src/components/TabHeader';
import { Dialog } from '@/src/components/ui/dialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FolderDialogContent } from '../components/FolderDialogContent';

export const FolderHeader = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get('action');
  const [openDialog, setOpenDialog] = useState(
    isAuthenticated && action === 'add-folder'
  );

  const handleAdd = () => {
    if (!isAuthenticated) {
      router.push('/login?next=%2F%3Ftab%3Dimages%26action%3Dadd-folder');
      return;
    }
    setOpenDialog(true);
  };

  const handleOpenChange = (open: boolean) => {
    setOpenDialog(open);
    if (!open && action === 'add-folder') router.replace('/?tab=images');
  };

  return (
    <>
      <TabHeader
        description="Gerencie suas pastas e escolha quais imagens devem ser usadas como papéis de parede"
        buttonText="Adicionar pasta"
        onClick={handleAdd}
      />
      <Dialog open={openDialog} onOpenChange={handleOpenChange}>
        <FolderDialogContent setIsDialogOpen={handleOpenChange} />
      </Dialog>
    </>
  );
};
