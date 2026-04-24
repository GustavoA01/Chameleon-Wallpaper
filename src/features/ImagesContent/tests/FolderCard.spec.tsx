import { render, screen } from '@testing-library/react';
import { FolderCard } from '../components/FolderCard';
import { FolderCardProps } from '../types';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'Link';

  return MockLink;
});

jest.mock('../container/FolderActions', () => ({
  FolderActions: ({ id }: { id: string }) => (
    <div data-testid="folder-actions" data-id={id}>
      <button data-testid="mock-actions">Actions</button>
    </div>
  ),
}));

const defaultProps: FolderCardProps = {
  id: 'folder-123',
  name: 'Minha Pasta',
  description: 'Esta é uma descrição da pasta',
  imageCount: 5,
};

describe('FolderCard', () => {
  const renderComponent = (props = defaultProps) =>
    render(<FolderCard {...props} />);

  it('should render the folder name', () => {
    renderComponent();
    expect(screen.getByText('Minha Pasta')).toBeInTheDocument();
  });

  it('should render the folder description', () => {
    renderComponent();
    expect(
      screen.getByText('Esta é uma descrição da pasta')
    ).toBeInTheDocument();
  });

  it('should render the folder icon', () => {
    renderComponent();
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render the FolderActions component', () => {
    renderComponent();
    expect(screen.getByTestId('folder-actions')).toBeInTheDocument();
  });

  it('should pass correct id to FolderActions', () => {
    renderComponent();
    const folderActions = screen.getByTestId('folder-actions');
    expect(folderActions).toHaveAttribute('data-id', 'folder-123');
  });

  it('should render the badge with correct text for multiple images', () => {
    renderComponent();
    expect(screen.getByText('5 Imagens')).toBeInTheDocument();
  });

  it('should render the badge with correct text for single image', () => {
    renderComponent({ ...defaultProps, imageCount: 1 });
    expect(screen.getByText('1 Imagem')).toBeInTheDocument();
  });

  it('should render the badge with correct text for zero images', () => {
    renderComponent({ ...defaultProps, imageCount: 0 });
    expect(screen.getByText('Nenhuma Imagem')).toBeInTheDocument();
  });

  it('should have link with correct href', () => {
    renderComponent();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/folder/folder-123');
  });

  it('should have card with hover effects', () => {
    renderComponent();
    const card = document.querySelector('.group');
    expect(card).toHaveClass(
      'group',
      'hover:border-primary',
      'cursor-pointer',
      'border',
      'border-transparent'
    );
  });

  it('should have title with hover effect', () => {
    renderComponent();
    const title = document.querySelector('.group-hover\\:text-primary');
    expect(title).toHaveClass(
      'font-montserrat',
      'line-clamp-1',
      'group-hover:text-primary'
    );
  });

  it('should have icon container with hover effect', () => {
    renderComponent();
    const iconContainer = document.querySelector(
      '.group-hover\\:bg-primary\\/10'
    );
    expect(iconContainer).toHaveClass(
      'p-2',
      'rounded-md',
      'bg-muted',
      'group-hover:bg-primary/10'
    );
  });

  it('should have CardAction with flex layout', () => {
    renderComponent();
    const cardAction = document.querySelector('.items-center');
    expect(cardAction).toHaveClass('flex', 'items-center', 'gap-2');
  });

  it('should handle long description with line-clamp', () => {
    const longDescription =
      'Esta é uma descrição muito longa que deve ser cortada com line-clamp para não quebrar o layout do card e ficar feio na interface';
    renderComponent({ ...defaultProps, description: longDescription });

    const description = screen.getByText(longDescription);
    expect(description).toHaveClass('line-clamp-1');
  });

  it('should have folder icon size 20', () => {
    renderComponent();
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
  });

  it('should have transition effects', () => {
    renderComponent();
    const card = document.querySelector('.group');
    expect(card).toHaveClass('transition-all', 'duration-200');

    const title = document.querySelector('.group-hover\\:text-primary');
    expect(title).toHaveClass('transition-all', 'duration-200');
  });
});
