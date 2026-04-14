'use client';
import { Dialog } from '@/src/components/ui/dialog';
import { useState } from 'react';
import { FolderDialogContent } from '../components/FolderDialogContent';
import { ConfirmFolderDelete } from '../components/ConfirmFolderDelete';
import { FolderDropDown } from '../components/FolderDropD';

export const FolderActions = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const onEdit = (e: Event) => {
    e.preventDefault();
    setOpenDropdown(false);
    setOpenEditDialog(true);
  };

  const onOpenDeleteDialog = (e: Event) => {
    e.preventDefault();
    setOpenDropdown(false);
    setOpenDeleteDialog(true);
  };

  const onDelete = () => {
    setOpenDeleteDialog(false);
  };

  const blockPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div onClick={blockPropagation}>
      <FolderDropDown
        onEdit={onEdit}
        onOpenDeleteDialog={onOpenDeleteDialog}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <FolderDialogContent />
      </Dialog>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <ConfirmFolderDelete folderName="teste" onDelete={onDelete} />
      </Dialog>
    </div>
  );
};
