'use client';
import { Dialog } from '@/src/components/ui/dialog';
import { FolderDialogContent } from '../components/FolderDialogContent';
import { ActionsDropDown } from '../../../components/ActionsDropD';
import { ConfirmDeleteModal } from '@/src/components/ConfirmDeleteModal';
import { useFolderActions } from '../hooks/useFolderActions';

export const FolderActions = ({ id }: { id: string }) => {
  const {
    blockPropagation,
    onDelete,
    onEdit,
    onOpenDeleteDialog,
    openDeleteDialog,
    openDropdown,
    openEditDialog,
    setOpenDeleteDialog,
    setOpenDropdown,
    setOpenEditDialog,
  } = useFolderActions(id);

  return (
    <div onClick={blockPropagation}>
      <ActionsDropDown
        onEdit={onEdit}
        onOpenDeleteDialog={onOpenDeleteDialog}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <FolderDialogContent id={id} setIsDialogOpen={setOpenEditDialog} />
      </Dialog>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <ConfirmDeleteModal
          onDelete={onDelete}
          title="Excluir pasta"
          description="Tem certeza que deseja excluir esta pasta? Esta ação removerá as imagens dentro da pasta e os dispositivos ligados a ela também"
        />
      </Dialog>
    </div>
  );
};
