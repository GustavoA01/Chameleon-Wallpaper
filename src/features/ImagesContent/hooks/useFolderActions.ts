import { useState } from 'react';
import { useFolderMutation } from './useFolderMutation';

export const useFolderActions = (id: string) => {
  const { deleteFolderFn } = useFolderMutation();
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
    deleteFolderFn(id);
  };

  const blockPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return {
    openDropdown,
    setOpenDropdown,
    openEditDialog,
    setOpenEditDialog,
    openDeleteDialog,
    setOpenDeleteDialog,
    onEdit,
    onOpenDeleteDialog,
    onDelete,
    blockPropagation,
  };
};
