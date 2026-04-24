import { fireEvent, render, screen } from '@testing-library/react';
import { ImageCard } from '../ImageCard';
import { deleteImage } from '@/src/actions/images/deleteImage';
import { MockImageProps } from '@/src/data/types';

jest.mock('../../actions/images/deleteImage', () => ({
  deleteImage: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: MockImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  ),
}));

const mockImage = {
  id: 'img-123',
  title: 'Imagem de Teste',
  url: 'https://example.com/image.jpg',
  publicId: 'public-456',
  folderId: 'folder-789',
};

describe('ImageCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <ImageCard
        id={mockImage.id}
        title={mockImage.title}
        url={mockImage.url}
        publicId={mockImage.publicId}
        folderId={mockImage.folderId}
      />
    );

  it('should render the image with correct src and alt', () => {
    renderComponent();
    const image = screen.getByAltText('Imagem de Teste');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('example.com/image.jpg')
    );
  });

  it('should render the image title', () => {
    renderComponent();
    expect(screen.getByText('Imagem de Teste')).toBeInTheDocument();
  });

  it('should render the delete button', () => {
    renderComponent();
    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
  });

  it('should have trash icon in delete button', () => {
    renderComponent();
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '14');
    expect(svg).toHaveAttribute('height', '14');
  });

  it('should have correct image dimensions', () => {
    renderComponent();
    const image = screen.getByAltText('Imagem de Teste');
    expect(image).toHaveAttribute('width', '400');
    expect(image).toHaveAttribute('height', '300');
  });

  it('should have the correct CSS classes on container', () => {
    renderComponent();
    const container = document.querySelector('.group');
    expect(container).toHaveClass(
      'group',
      'h-auto',
      'overflow-hidden',
      'rounded-md',
      'relative',
      'border',
      'border-bg-transparent',
      'hover:border-primary',
      'transition-all',
      'duration-200'
    );
  });

  it('should have the correct CSS classes on image', () => {
    renderComponent();
    const image = screen.getByAltText('Imagem de Teste');
    expect(image).toHaveClass(
      'aspect-video',
      'group-hover:scale-110',
      'object-cover',
      'w-full',
      'transition-all',
      'duration-400',
      'rounded-md'
    );
  });

  it('should have title with line-clamp-1 class', () => {
    renderComponent();
    const title = screen.getByText('Imagem de Teste');
    expect(title).toHaveClass('font-bold', 'line-clamp-1', 'text-white');
  });

  it('should call deleteImage when delete button is clicked', async () => {
    renderComponent();

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    expect(deleteImage).toHaveBeenCalledTimes(1);
    expect(deleteImage).toHaveBeenCalledWith('img-123', 'public-456');
  });

  it('should handle long titles with line-clamp', () => {
    const longTitle =
      'Este é um título muito longo que deve ser cortado com line-clamp para não quebrar o layout da imagem card';
    render(
      <ImageCard
        id={mockImage.id}
        title={longTitle}
        url={mockImage.url}
        publicId={mockImage.publicId}
        folderId={mockImage.folderId}
      />
    );
    const title = screen.getByText(longTitle);

    expect(title).toHaveClass('line-clamp-1');
  });

  it('should apply hover effects on group hover', () => {
    renderComponent();
    const image = screen.getByAltText('Imagem de Teste');
    const overlay = document.querySelector('.sm\\:translate-y-15');

    expect(image).toHaveClass('group-hover:scale-110');
    expect(overlay).toHaveClass('group-hover:translate-y-0');
  });

  it('should have border transition effect', () => {
    renderComponent();
    const container = document.querySelector('.group');

    expect(container).toHaveClass(
      'hover:border-primary',
      'transition-all',
      'duration-200'
    );
  });

  it('should render image with correct aspect ratio', () => {
    renderComponent();
    const image = screen.getByAltText('Imagem de Teste');

    expect(image).toHaveClass('aspect-video');
  });

  it('should have backdrop blur on overlay', () => {
    renderComponent();
    const overlay = document.querySelector('.backdrop-blur-xs');

    expect(overlay).toBeInTheDocument();
  });
});
