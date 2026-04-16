import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  it('renders the header with the correct title', () => {
    render(<Header />);
    expect(screen.getByText('Chameleon Wallpaper')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toHaveClass('bg-primary');
  });
});
