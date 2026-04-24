import { ActionsDropDown } from '@/src/components/ActionsDropD';
import { Dialog } from '@/src/components/ui/dialog';
import { DevicesDialogContent } from '../components/DevicesDialogContent';
import { ConfirmDeleteModal } from '@/src/components/ConfirmDeleteModal';
import { useDeviceActions } from '../hooks/useDeviceActions';
import { DevicesActionsProps } from '../types';

export const DevicesActions = ({ id, folders }: DevicesActionsProps) => {
  const {
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
  } = useDeviceActions(id);

  return (
    <div onClick={blockPropagation}>
      <ActionsDropDown
        onEdit={onEdit}
        onOpenDeleteDialog={onOpenDeleteDialog}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DevicesDialogContent
          id={id}
          folders={folders}
          setIsDialogOpen={setOpenEditDialog}
        />
      </Dialog>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <ConfirmDeleteModal
          onDelete={onDelete}
          title="Excluir dispositivo"
          description="Tem certeza que deseja excluir este dispositivo?"
        />
      </Dialog>
    </div>
  );
};
