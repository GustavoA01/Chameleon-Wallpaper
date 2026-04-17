import { LabelInput } from '@/src/components/LabelInput';
import { FolderFormData } from '@/src/data/schemas';
import { useFolderForm } from '../hooks/useFolderForm';

export const FolderForm = () => {
  const { handleSaveFolder, handleSubmit, register, errors } = useFolderForm();

  return (
    <form
      id="folder-form"
      className="space-y-4"
      onSubmit={handleSubmit(handleSaveFolder)}
    >
      <LabelInput<FolderFormData>
        errors={errors}
        label="Nome"
        placeholder="Ex: Natureza"
        name="name"
        register={register}
      />
      <LabelInput<FolderFormData>
        errors={errors}
        label="Descrição breve"
        placeholder="Ex: imagens da natureza"
        name="description"
        register={register}
      />
    </form>
  );
};
