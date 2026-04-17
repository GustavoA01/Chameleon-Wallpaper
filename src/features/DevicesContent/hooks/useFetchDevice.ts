import { getDeviceById } from '@/src/actions/devices/getDeviceById';
import { DeviceFormData } from '@/src/data/schemas';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export const useFetchDevice = (
  methods: UseFormReturn<DeviceFormData>,
  id: string | undefined
) => {
  const { reset } = methods;

  useEffect(() => {
    if (!id) return;
    const fetchDevice = async () => {
      const response = await getDeviceById(id);
      if (response) {
        reset({
          name: response.name,
          intervalSeconds: String(response.intervalSeconds),
          selectedFolderId: response.selectedFolderId,
        });
      }
    };
    fetchDevice();
  }, [id, reset]);
};
