import {
  DialogContent,
  DialogDescription,
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
  </DialogContent>
);
