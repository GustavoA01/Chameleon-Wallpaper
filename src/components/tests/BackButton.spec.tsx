import { fireEvent, render } from '@testing-library/react';
import { BackButton } from '../BackButton';

const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe('BackButton', () => {
  it('should render the BackButton component', () => {
    const { getByRole } = render(<BackButton />);
    const button = getByRole('button');

    fireEvent.click(button);
    expect(mockBack).toHaveBeenCalled();
  });
});
