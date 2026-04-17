import { FolderFormData, folderSchema } from '@/src/data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFolderMutation } from './useFolderMutation';

export const useFolderForm = (setIsDialogOpen?: (open: boolean) => void) => {
  const { createFolderFn } = useFolderMutation(setIsDialogOpen);
  const methods = useForm<FolderFormData>({
    resolver: zodResolver(folderSchema),
  });

  const handleSaveFolder = async (data: FolderFormData) => {
    await createFolderFn(data);
  };

  return {
    handleSubmit: methods.handleSubmit,
    register: methods.register,
    errors: methods.formState.errors,
    handleSaveFolder,
  };
};
