import z from 'zod';

export const folderSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().optional(),
});

export const deviceSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  selectedFolder: z.string({ message: 'Selecione uma pasta' }),
  selectedTime: z.string(),
});

export type FolderFormData = z.infer<typeof folderSchema>;
export type DeviceFormData = z.infer<typeof deviceSchema>;
