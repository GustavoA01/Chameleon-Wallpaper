import { createFolder } from '@/src/actions/folder/createFolder';
import { deleteFolder } from '@/src/actions/folder/deleteFolder';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useFolderMutation = (
  setIsDialogOpen?: (open: boolean) => void
) => {
  const { mutateAsync: createFolderFn } = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      setIsDialogOpen?.(false);
      toast.success('Pasta criada');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Erro ao criar pasta');
    },
  });

  const { mutateAsync: deleteFolderFn } = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      setIsDialogOpen?.(false);
      toast.success('Pasta excluída');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Erro ao excluir pasta');
    },
  });

  return {
    createFolderFn,
    deleteFolderFn,
  };
};
