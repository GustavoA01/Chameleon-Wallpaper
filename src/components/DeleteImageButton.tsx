'use client';
import { Trash } from 'lucide-react';
import { Button } from './ui/button';
import { deleteImage } from '../actions/images/deleteImage';

type DeleteImageButtonProps = {
  id: string;
  publicId: string;
};

export const DeleteImageButton = ({ id, publicId }: DeleteImageButtonProps) => (
  <Button
    variant="destructive"
    size="icon"
    onClick={() => deleteImage(id, publicId)}
  >
    <Trash className="text-destructive" size={14} />
  </Button>
);
