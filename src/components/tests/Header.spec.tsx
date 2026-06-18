import { render, screen } from '@testing-library/react';
import { Header } from '../Header';
import { getCurrentUser } from '../../lib/auth';

jest.mock('../../lib/auth', () => ({
  getCurrentUser: jest.fn(),
}));

const mockGetCurrentUser = getCurrentUser as jest.MockedFunction<
  typeof getCurrentUser
>;

describe('Header', () => {
  beforeEach(() => {
    mockGetCurrentUser.mockResolvedValue(null);
  });

  it('renders the header with the correct title', async () => {
    render(await Header());

    expect(screen.getByText('Chameleon Wallpaper')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toHaveClass('bg-primary');
  });

  it('renders logout for an authenticated user', async () => {
    mockGetCurrentUser.mockResolvedValue({
      id: 'user-1',
      email: 'user@example.com',
      passwordHash: 'hash',
      createdAt: new Date(),
    });

    render(await Header());

    expect(screen.getByRole('button', { name: 'Sair' })).toBeInTheDocument();
  });
});
