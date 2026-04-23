import { render, screen } from '@testing-library/react';
import { Dialog } from '@/src/components/ui/dialog';
import { ConfirmDeleteModal } from '../ConfirmDeleteModal';

const onDeleteMock = jest.fn();

describe('ConfirmDeleteModal', () => {
  const renderComponent = () => (
    <Dialog open>
      <ConfirmDeleteModal
        title="Excluir item"
        description="Tem certeza?"
        onDelete={onDeleteMock}
      />
    </Dialog>
  );

  it('should open modal and confirm deletion', async () => {
    render(renderComponent());

    expect(screen.queryByText('Excluir item')).toBeInTheDocument();
    expect(screen.queryByText('Tem certeza?')).toBeInTheDocument();
  });

  it('should call delete function', async () => {
    render(renderComponent());
    const deleteButton = screen.getByRole('button', { name: 'Excluir' });

    deleteButton.click();
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
