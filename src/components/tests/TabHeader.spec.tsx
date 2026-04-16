import { render, screen, fireEvent } from '@testing-library/react';
import { TabHeader } from '../TabHeader';

const defaultProps = {
  description: 'Upload your images here',
  buttonText: 'Add New',
  onClick: jest.fn(),
};

describe('TabHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render description text correctly', () => {
    render(<TabHeader {...defaultProps} />);

    expect(screen.getByText('Upload your images here')).toBeInTheDocument();
  });

  it('should render button text correctly', () => {
    render(<TabHeader {...defaultProps} />);

    expect(screen.getByText('Add New')).toBeInTheDocument();
  });

  it('should render Plus icon', () => {
    render(<TabHeader {...defaultProps} />);
    const svg = document.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });

  it('should call onClick when button is clicked', () => {
    render(<TabHeader {...defaultProps} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply correct CSS classes to header', () => {
    render(<TabHeader {...defaultProps} />);
    const header = document.querySelector('header');

    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('justify-between');
    expect(header).toHaveClass('items-center');
  });

  it('should apply correct CSS classes to description', () => {
    render(<TabHeader {...defaultProps} />);
    const description = screen.getByText('Upload your images here');

    expect(description).toHaveClass('text-muted-foreground');
  });

  it('should apply correct CSS classes to button text paragraph', () => {
    render(<TabHeader {...defaultProps} />);
    const buttonText = screen.getByText('Add New');

    expect(buttonText).toHaveClass('hidden');
    expect(buttonText).toHaveClass('sm:flex');
  });

  it('should hide button text on mobile screens', () => {
    render(<TabHeader {...defaultProps} />);
    const buttonText = screen.getByText('Add New');

    expect(buttonText).toHaveClass('hidden');
    expect(buttonText).not.toHaveClass('sm:hidden');
  });

  it('should render button with Plus icon and text', () => {
    render(<TabHeader {...defaultProps} />);
    const button = screen.getByRole('button');

    expect(button).toContainElement(document.querySelector('svg'));
    expect(button).toHaveTextContent('Add New');
  });

  it('should handle different description texts', () => {
    const descriptions = [
      'Select a category',
      'Choose your preferences',
      'Configure settings',
      'Review your selection',
    ];

    descriptions.forEach((description) => {
      const { unmount } = render(
        <TabHeader
          description={description}
          buttonText="Next"
          onClick={jest.fn()}
        />
      );

      expect(screen.getByText(description)).toBeInTheDocument();
      unmount();
    });
  });

  it('should handle different button texts', () => {
    const buttonTexts = [
      'Create',
      'Save',
      'Delete',
      'Update',
      'Cancel',
      'Confirm',
    ];

    buttonTexts.forEach((buttonText) => {
      const { unmount } = render(
        <TabHeader
          description="Action required"
          buttonText={buttonText}
          onClick={jest.fn()}
        />
      );

      expect(screen.getByText(buttonText)).toBeInTheDocument();
      unmount();
    });
  });

  it('should handle onClick with custom logic', () => {
    const mockOnClick = jest.fn();

    render(
      <TabHeader
        description="Test description"
        buttonText="Click Me"
        onClick={mockOnClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it('should maintain button functionality with empty texts', () => {
    const mockOnClick = jest.fn();

    render(<TabHeader description="" buttonText="" onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should render header with proper structure', () => {
    render(<TabHeader {...defaultProps} />);

    const header = document.querySelector('header');
    const h2 = document.querySelector('h2');
    const button = screen.getByRole('button');
    const svg = document.querySelector('svg');
    const paragraph = screen.getByText('Add New');

    expect(header).toContainElement(h2);
    expect(header).toContainElement(button);
    expect(button).toContainElement(svg);
    expect(button).toContainElement(paragraph);
  });

  it('should handle multiple clicks correctly', () => {
    const mockOnClick = jest.fn();

    render(
      <TabHeader
        description="Multiple clicks test"
        buttonText="Click multiple times"
        onClick={mockOnClick}
      />
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(5);
  });

  it('should render with long texts without breaking layout', () => {
    const longDescription =
      'This is a very long description text that should still render properly within the component layout and not cause any visual issues';
    const longButtonText = 'ThisIsAVeryLongButtonTextThatShouldStillBeVisible';

    render(
      <TabHeader
        description={longDescription}
        buttonText={longButtonText}
        onClick={jest.fn()}
      />
    );

    expect(screen.getByText(longDescription)).toBeInTheDocument();
    expect(screen.getByText(longButtonText)).toBeInTheDocument();
  });

  it('should render with special characters in texts', () => {
    const specialDescription = 'Description with @#$%^&*() special characters!';
    const specialButtonText = 'Button with 1234567890 numbers';

    render(
      <TabHeader
        description={specialDescription}
        buttonText={specialButtonText}
        onClick={jest.fn()}
      />
    );

    expect(screen.getByText(specialDescription)).toBeInTheDocument();
    expect(screen.getByText(specialButtonText)).toBeInTheDocument();
  });
});
