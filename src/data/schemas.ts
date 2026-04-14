import z from 'zod';

export const folderSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().optional(),
});

export type FolderFormData = z.infer<typeof folderSchema>;
