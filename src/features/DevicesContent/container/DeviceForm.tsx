import { LabelInput } from '@/src/components/LabelInput';
import { DeviceFormData } from '@/src/data/schemas';
import { Controller } from 'react-hook-form';
import { FolderSelect } from '../components/FolderSelect';
import { TimeSelect } from '../components/TimeSelect';
import { Label } from '@/src/components/ui/label';
import { useDeviceForm } from '../hooks/useDeviceForm';
import { DeviceFormProps } from '../types';

export const DeviceForm = ({
  id,
  folders,
  setIsDialogOpen,
}: DeviceFormProps) => {
  const { handleSaveDevice, control, handleSubmit, register, errors } =
    useDeviceForm(id, setIsDialogOpen);

  return (
    <form id="devices-form" onSubmit={handleSubmit(handleSaveDevice)}>
      <LabelInput<DeviceFormData>
        name="name"
        label="Nome do dispositivo"
        placeholder="Ex: computador casa"
        register={register}
        errors={errors}
      />

      <div className="space-y-2">
        <Label>Pasta de imagens</Label>
        <Controller
          control={control}
          name="selectedFolderId"
          render={({ formState, field: { value, onChange } }) => (
            <>
              <FolderSelect
                folders={folders ?? []}
                value={value}
                onValueChange={onChange}
              />
              {formState.errors.selectedFolderId && (
                <p className="text-sm text-red-500 my-1">
                  {formState.errors.selectedFolderId.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label>Tempo de atualização</Label>
        <Controller
          control={control}
          name="intervalSeconds"
          defaultValue="3600"
          render={({ formState, field: { value, onChange } }) => (
            <>
              <TimeSelect value={value} onValueChange={onChange} />
              {formState.errors.intervalSeconds && (
                <p className="text-sm text-red-500 my-2">
                  {formState.errors.intervalSeconds.message}
                </p>
              )}
            </>
          )}
        />
      </div>
    </form>
  );
};
