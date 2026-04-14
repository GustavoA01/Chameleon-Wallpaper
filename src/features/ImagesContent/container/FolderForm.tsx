import { LabelInput } from '@/src/components/LabelInput';
import { FolderFormData, folderSchema } from '@/src/data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const FolderForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FolderFormData>({
    resolver: zodResolver(folderSchema),
  });

  const handleSaveFolder = (data: FolderFormData) => {
    console.log(data);
  };

  return (
    <form
      id="folder-form"
      className="space-y-4"
      onSubmit={handleSubmit(handleSaveFolder)}
    >
      <LabelInput<FolderFormData>
        errors={errors}
        label="Nome"
        placeholder="Ex: natureza"
        name="name"
        register={register}
      />
      <LabelInput<FolderFormData>
        errors={errors}
        label="Descrição breve"
        placeholder="Ex: imagens relaxantes"
        name="description"
        register={register}
      />
    </form>
  );
};
