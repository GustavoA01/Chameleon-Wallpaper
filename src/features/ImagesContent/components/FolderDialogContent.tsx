import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { FolderForm } from '../container/FolderForm';
import { FolderDialogContentProps } from '../types';

export const FolderDialogContent = ({
  id,
  setIsDialogOpen,
}: FolderDialogContentProps) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{id ? 'Editar' : 'Criar'} pasta</DialogTitle>
      <DialogDescription>
        {id ? 'Edite as informações da' : 'Adicione uma nova'} pasta para
        organizar suas imagens
      </DialogDescription>
    </DialogHeader>
    <FolderForm id={id} setIsDialogOpen={setIsDialogOpen} />
  </DialogContent>
);
