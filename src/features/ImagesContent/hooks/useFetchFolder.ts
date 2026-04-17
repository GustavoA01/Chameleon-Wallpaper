import { getFolderById } from '@/src/actions/folder/getFolderById';
import { FolderFormData } from '@/src/data/schemas';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export const useFetchFolder = (
  methods: UseFormReturn<FolderFormData>,
  id?: string
) => {
  const { reset } = methods;

  useEffect(() => {
    if (!id) return;
    const fetchFolder = async () => {
      const response = await getFolderById(id);
      if (response) {
        reset({
          name: response.name,
          description: response.description ?? undefined,
        });
      }
    };
    fetchFolder();
  }, [id, reset]);
};
