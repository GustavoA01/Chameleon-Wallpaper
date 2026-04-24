import { LabelInput } from '@/src/components/LabelInput';
import { FolderFormData } from '@/src/data/schemas';
import { useFolderForm } from '../hooks/useFolderForm';
import { Button } from '@/src/components/ui/button';
import { DialogClose, DialogFooter } from '@/src/components/ui/dialog';
import { FolderFormProps } from '../types';

export const FolderForm = ({ id, setIsDialogOpen }: FolderFormProps) => {
  const { handleSaveFolder, handleSubmit, register, errors } = useFolderForm(
    id,
    setIsDialogOpen
  );

  return (
    <form id="folder-form" className="space-y-4">
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
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button
          type="submit"
          form="folder-form"
          onClick={handleSubmit(handleSaveFolder)}
        >
          Salvar
        </Button>
      </DialogFooter>
    </form>
  );
};
