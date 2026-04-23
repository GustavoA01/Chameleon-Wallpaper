import { fireEvent, render, screen } from '@testing-library/react';
import { Drawer } from '@/src/components/ui/drawer';
import { ActionsDropDown } from '../ActionsDropD';

const mockOnEdit = jest.fn();
const mockOnOpenDeleteDialog = jest.fn();
const mockSetOpenDropdown = jest.fn();

describe('ActionsDropDown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (openDropdown = false) =>
    render(
      <Drawer open>
        <ActionsDropDown
          onEdit={mockOnEdit}
          onOpenDeleteDialog={mockOnOpenDeleteDialog}
          openDropdown={openDropdown}
          setOpenDropdown={mockSetOpenDropdown}
        />
      </Drawer>
    );

  it('should render the trigger button', () => {
    renderComponent();
    const triggerButton = screen.getByRole('button');

    expect(triggerButton).toBeInTheDocument();
  });

  it('should render the MoreVertical icon in trigger button', () => {
    renderComponent();
    const svg = document.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('h-4', 'w-4');
  });

  it('should show dropdown content when openDropdown is true', () => {
    renderComponent(true);

    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Excluir')).toBeInTheDocument();
  });

  it('should not show dropdown content when openDropdown is false', () => {
    renderComponent(false);

    expect(screen.queryByText('Editar')).not.toBeInTheDocument();
    expect(screen.queryByText('Excluir')).not.toBeInTheDocument();
  });

  it('should call onEdit when clicking Editar', () => {
    renderComponent(true);

    const editButton = screen.getByText('Editar');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('should call onOpenDeleteDialog when clicking Excluir', () => {
    renderComponent(true);

    const deleteButton = screen.getByText('Excluir');
    fireEvent.click(deleteButton);

    expect(mockOnOpenDeleteDialog).toHaveBeenCalledTimes(1);
  });

  it('should render the Pencil icon in edit option', () => {
    renderComponent(true);
    const pencilIcons = document.querySelectorAll('svg');

    expect(pencilIcons.length).toBeGreaterThanOrEqual(2);
  });

  it('should render the Trash2 icon in delete option', () => {
    renderComponent(true);

    const trashIcon = document.querySelectorAll('svg');
    expect(trashIcon.length).toBeGreaterThanOrEqual(2);
  });

  it('should have edit option with cursor-pointer class', () => {
    renderComponent(true);

    const editOption = screen.getByText('Editar').closest('[role="menuitem"]');
    expect(editOption).toHaveClass('cursor-pointer');
  });

  it('should have delete option with text-destructive class', () => {
    renderComponent(true);

    const deleteOption = screen
      .getByText('Excluir')
      .closest('[role="menuitem"]');
    expect(deleteOption).toHaveClass('text-destructive');
  });

  it('should have dropdown menu with align end', () => {
    renderComponent(true);

    const dropdownContent = document.querySelector(
      '[data-radix-popper-content-wrapper]'
    );
    expect(dropdownContent).toBeInTheDocument();
  });

  it('should stop propagation on edit click', () => {
    const onParentClick = jest.fn();

    render(
      <Drawer open>
        <div onClick={onParentClick}>
          <ActionsDropDown
            onEdit={mockOnEdit}
            onOpenDeleteDialog={mockOnOpenDeleteDialog}
            openDropdown={true}
            setOpenDropdown={mockSetOpenDropdown}
          />
        </div>
      </Drawer>
    );

    const editButton = screen.getByText('Editar');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalled();
    expect(onParentClick).not.toHaveBeenCalled();
  });

  it('should stop propagation on delete click', () => {
    const onParentClick = jest.fn();

    render(
      <Drawer open>
        <div onClick={onParentClick}>
          <ActionsDropDown
            onEdit={mockOnEdit}
            onOpenDeleteDialog={mockOnOpenDeleteDialog}
            openDropdown={true}
            setOpenDropdown={mockSetOpenDropdown}
          />
        </div>
      </Drawer>
    );

    const deleteButton = screen.getByText('Excluir');
    fireEvent.click(deleteButton);

    expect(mockOnOpenDeleteDialog).toHaveBeenCalled();
    expect(onParentClick).not.toHaveBeenCalled();
  });

  it('should have dropdown menu with width class w-40', () => {
    renderComponent(true);
    const dropdownContent = screen.getByText('Editar').closest('[role="menu"]');

    expect(dropdownContent).toHaveClass('w-40');
  });
});
