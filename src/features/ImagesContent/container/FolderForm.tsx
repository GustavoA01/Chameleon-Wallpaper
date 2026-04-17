import { LabelInput } from '@/src/components/LabelInput';
import { FolderFormData } from '@/src/data/schemas';
import { useFolderForm } from '../hooks/useFolderForm';

type FolderFormProps = {
  setIsDialogOpen?: (open: boolean) => void;
};

export const FolderForm = ({ setIsDialogOpen }: FolderFormProps) => {
  const { handleSaveFolder, handleSubmit, register, errors } =
    useFolderForm(setIsDialogOpen);

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
