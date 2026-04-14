import { LabelInput } from '@/src/components/LabelInput';
import { DeviceFormData, deviceSchema } from '@/src/data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { FolderSelect } from '../components/DeviceCard/FolderSelect';
import { TimeSelect } from '../components/DeviceCard/TimeSelect';
import { Label } from '@/src/components/ui/label';

export const DeviceForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DeviceFormData>({
    resolver: zodResolver(deviceSchema),
  });

  const handleSaveDevice = (data: DeviceFormData) => {
    const newDevice = {
      ...data,
      selectedTime: Number(data.selectedTime),
    };
  };

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
          name="selectedFolder"
          render={({ formState, field: { value, onChange } }) => (
            <>
              <FolderSelect value={value} onValueChange={onChange} />
              {formState.errors.selectedFolder && (
                <p className="text-sm text-red-500 my-1">
                  {formState.errors.selectedFolder.message}
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
          name="selectedTime"
          defaultValue="3600"
          render={({ formState, field: { value, onChange } }) => (
            <>
              <TimeSelect value={value} onValueChange={onChange} />
              {formState.errors.selectedTime && (
                <p className="text-sm text-red-500 my-2">
                  {formState.errors.selectedTime.message}
                </p>
              )}
            </>
          )}
        />
      </div>
    </form>
  );
};
