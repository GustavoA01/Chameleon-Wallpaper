import { act, fireEvent, render, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { HomeTabs } from '../HomeTabs';
import { tabs } from '../../data/constants';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

type ReadonlyURLSearchParams = ReturnType<typeof useSearchParams>;

describe('HomeTabs', () => {
  const mockUseSearchParams = useSearchParams as jest.MockedFunction<
    typeof useSearchParams
  >;

  const setInitialTab = (tab?: string) => {
    const params = new URLSearchParams();
    if (tab) params.set('tab', tab);
    mockUseSearchParams.mockReturnValue(
      params as unknown as ReadonlyURLSearchParams
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.history.replaceState(null, '', '/');
  });

  it('renders every tab and its icon', () => {
    setInitialTab('images');
    render(<HomeTabs />);

    tabs.forEach((tab) => {
      const button = screen.getByText(tab.label).closest('button');
      expect(button).toBeInTheDocument();
      expect(button?.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('uses images as the default active tab', () => {
    setInitialTab();
    render(<HomeTabs />);

    expect(
      screen.getByText('Biblioteca de imagens').closest('button')
    ).toHaveClass('border-b-primary');
    expect(screen.getByText('Dispositivos').closest('button')).not.toHaveClass(
      'border-b-primary'
    );
  });

  it('uses the URL tab as the initial active tab', () => {
    setInitialTab('devices');
    render(<HomeTabs />);

    expect(screen.getByText('Dispositivos').closest('button')).toHaveClass(
      'border-b-primary'
    );
  });

  it('updates the URL locally without a server navigation', () => {
    setInitialTab('images');
    render(<HomeTabs />);

    fireEvent.click(screen.getByText('Dispositivos'));

    expect(window.location.search).toBe('?tab=devices');
    expect(screen.getByText('Dispositivos').closest('button')).toHaveClass(
      'border-b-primary'
    );
  });

  it('preserves unrelated URL parameters when changing tabs', () => {
    window.history.replaceState(null, '', '?tab=images&search=natureza&page=2');
    setInitialTab('images');
    render(<HomeTabs />);

    fireEvent.click(screen.getByText('Dispositivos'));

    expect(window.location.search).toBe('?tab=devices&search=natureza&page=2');
  });

  it('switches between content already loaded in memory', () => {
    setInitialTab('images');
    render(
      <HomeTabs
        imagesContent={<div>Biblioteca carregada</div>}
        devicesContent={<div>Dispositivos carregados</div>}
      />
    );

    expect(screen.getByText('Biblioteca carregada')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Dispositivos'));
    expect(screen.getByText('Dispositivos carregados')).toBeInTheDocument();
    expect(screen.queryByText('Biblioteca carregada')).not.toBeInTheDocument();
  });

  it('synchronizes the active tab when navigating browser history', () => {
    setInitialTab('images');
    render(<HomeTabs />);

    act(() => {
      window.history.pushState(null, '', '?tab=devices');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(screen.getByText('Dispositivos').closest('button')).toHaveClass(
      'border-b-primary'
    );
  });
});
