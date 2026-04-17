import { useState } from 'react';
import { useDeviceMutation } from './useDeviceMutation';

export const useDeviceActions = (id: string) => {
  const { deleteDeviceFn } = useDeviceMutation();
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
    deleteDeviceFn(id);
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
