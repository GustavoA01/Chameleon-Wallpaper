import { Dialog } from '@/src/components/ui/dialog';
import { render, screen } from '@testing-library/react';
import { FolderDialogContent } from '../components/FolderDialogContent';

describe('FolderDialogContent', () => {
  it('renders component correctly', () => {
    render(
      <Dialog open>
        <FolderDialogContent />
      </Dialog>
    );

    expect(
      screen.getByText('Adicione uma nova pasta para organizar suas imagens')
    ).toBeInTheDocument();
    expect(screen.getByText('Criar pasta')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });
});
