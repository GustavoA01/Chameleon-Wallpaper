import { FolderFormData, folderSchema } from '@/src/data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFolderMutation } from './useFolderMutation';
import { useFetchFolder } from './useFetchFolder';

export const useFolderForm = (
  id?: string,
  setIsDialogOpen?: (open: boolean) => void
) => {
  const methods = useForm<FolderFormData>({
    resolver: zodResolver(folderSchema),
  });
  const { createFolderFn, updateFolderFn } = useFolderMutation(setIsDialogOpen);
  useFetchFolder(methods, id);

  const handleSaveFolder = async (data: FolderFormData) => {
    if (id) await updateFolderFn({ id, data });
    else await createFolderFn(data);
  };

  return {
    handleSubmit: methods.handleSubmit,
    register: methods.register,
    errors: methods.formState.errors,
    handleSaveFolder,
  };
};
