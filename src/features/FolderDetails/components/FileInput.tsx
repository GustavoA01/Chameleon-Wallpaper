import { Input } from '@/src/components/ui/input';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';
import { FileInputProps } from '../types';

export const FileInput = ({
  choosedFile,
  chooseImageError,
  handleFileChange,
  handleImageError,
}: FileInputProps) => (
  <label
    htmlFor="select-image"
    className="flex items-center justify-center border rounded-xl bg-card p-4 h-auto cursor-pointer mt-2"
  >
    <Input
      id="select-image"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleFileChange}
    />
    {choosedFile ? (
      <Image
        src={choosedFile!}
        alt="Preview"
        width={200}
        height={300}
        onError={handleImageError}
        className="rounded-md"
      />
    ) : (
      <div className="flex flex-col items-center justify-center gap-2">
        <ImageUp size={18} className="cursor-pointer text-muted-foreground" />
        {chooseImageError && (
          <p className="text-sm text-destructive">{chooseImageError}</p>
        )}
      </div>
    )}
  </label>
);
