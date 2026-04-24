import { Button } from '@/src/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { DeviceForm } from '../container/DeviceForm';
import { DevicesDialogContentProps } from '../types';

export const DevicesDialogContent = ({
  id,
  folders,
  setIsDialogOpen,
}: DevicesDialogContentProps) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Adicionar dispositivo</DialogTitle>
      <DialogDescription>
        Adicione um novo dispositivo para vincular a seus papéis de parede
      </DialogDescription>
    </DialogHeader>
    <DeviceForm id={id} folders={folders} setIsDialogOpen={setIsDialogOpen} />
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button form="devices-form">Salvar</Button>
    </DialogFooter>
  </DialogContent>
);
