import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HomeTabs } from '../HomeTabs';
import { tabs } from '../../data/constants';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

type ReadonlyURLSearchParams = ReturnType<typeof useSearchParams>;

describe('HomeTabs', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockUseSearchParams = useSearchParams as jest.MockedFunction<
    typeof useSearchParams
  >;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it('should render all tabs', () => {
    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set('tab', 'images');
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );

    render(<HomeTabs />);

    tabs.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });
  });

  it('should have "images" tab active by default when no tab is in params', () => {
    const mockSearchParams = new URLSearchParams();
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );

    render(<HomeTabs />);

    const imagesTab = screen.getByText('Biblioteca de imagens');
    const devicesTab = screen.getByText('Dispositivos');

    expect(imagesTab.closest('button')).toHaveClass('border-b-primary');
    expect(devicesTab.closest('button')).not.toHaveClass('border-b-primary');
  });

  it('should show the correct tab as active based on URL parameter', () => {
    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set('tab', 'devices');
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );

    render(<HomeTabs />);

    const devicesTab = screen.getByText('Dispositivos');
    const imagesTab = screen.getByText('Biblioteca de imagens');

    expect(devicesTab.closest('button')).toHaveClass('border-b-primary');
    expect(imagesTab.closest('button')).not.toHaveClass('border-b-primary');
  });

  it('should call push with correct parameter when a tab is clicked', () => {
    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set('tab', 'images');
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );

    render(<HomeTabs />);

    const devicesTab = screen.getByText('Dispositivos');
    fireEvent.click(devicesTab);

    expect(mockPush).toHaveBeenCalledWith('?tab=devices');
  });

  it('should preserve other URL parameters when changing tabs', () => {
    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set('tab', 'images');
    mockSearchParams.set('search', 'natureza');
    mockSearchParams.set('page', '2');
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );

    render(<HomeTabs />);

    const devicesTab = screen.getByText('Dispositivos');
    fireEvent.click(devicesTab);

    expect(mockPush).toHaveBeenCalledWith(
      '?tab=devices&search=natureza&page=2'
    );
  });

  it('should apply correct classes for active and inactive tabs', () => {
    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set('tab', 'images');
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );

    render(<HomeTabs />);

    const activeTab = screen.getByText('Biblioteca de imagens');
    const inactiveTab = screen.getByText('Dispositivos');

    expect(activeTab.closest('button')).toHaveClass('border-b-primary');
    expect(activeTab.closest('button')).toHaveClass('text-primary');
    expect(inactiveTab.closest('button')).not.toHaveClass('border-b-primary');
    expect(inactiveTab.closest('button')).toHaveClass('text-muted-foreground');
  });

  it('should render icons correctly', () => {
    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set('tab', 'images');
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );

    render(<HomeTabs />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(tabs.length);

    buttons.forEach((button) => {
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  it('should handle empty URL parameters', () => {
    const mockSearchParams = new URLSearchParams();
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );

    render(<HomeTabs />);

    const devicesTab = screen.getByText('Dispositivos');
    fireEvent.click(devicesTab);

    expect(mockPush).toHaveBeenCalledWith('?tab=devices');
  });

  it('should update active tab when URL parameters change', () => {
    let mockSearchParams = new URLSearchParams();
    mockSearchParams.set('tab', 'images');
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );

    const { rerender } = render(<HomeTabs />);

    let imagesTab = screen.getByText('Biblioteca de imagens');
    expect(imagesTab.closest('button')).toHaveClass('border-b-primary');

    mockSearchParams = new URLSearchParams();
    mockSearchParams.set('tab', 'devices');
    mockUseSearchParams.mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams
    );

    rerender(<HomeTabs />);

    const devicesTab = screen.getByText('Dispositivos');
    imagesTab = screen.getByText('Biblioteca de imagens');

    expect(devicesTab.closest('button')).toHaveClass('border-b-primary');
    expect(imagesTab.closest('button')).not.toHaveClass('border-b-primary');
  });
});
