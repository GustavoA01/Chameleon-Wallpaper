export type FileInputProps = {
  choosedFile: string | undefined;
  chooseImageError: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageError: () => void;
};

export type DetailsHeaderProps = {
  folderId: string;
  title: string;
};
