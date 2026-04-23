import { render, screen } from '@testing-library/react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { LabelInput } from '../LabelInput';

const mockRegister = jest.fn().mockReturnValue({});
const mockErrors: FieldErrors<FieldValues> = {};

describe('LabelInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render label and input with correct props', () => {
    render(
      <LabelInput
        label="Username"
        placeholder="Enter your username"
        name="username"
        register={mockRegister as unknown as UseFormRegister<FieldValues>}
        errors={mockErrors}
      />
    );

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your username')
    ).toBeInTheDocument();
  });

  it('should register the input with react-hook-form', () => {
    render(
      <LabelInput
        label="Email"
        placeholder="Enter your email"
        name="email"
        register={mockRegister as unknown as UseFormRegister<FieldValues>}
        errors={mockErrors}
      />
    );

    expect(mockRegister).toHaveBeenCalledWith('email');
  });

  it('should display error message when there is an error for the field', () => {
    const errorsWithField: FieldErrors<FieldValues> = {
      email: {
        message: 'Email is required',
        type: 'required',
      },
    };

    render(
      <LabelInput
        label="Email"
        placeholder="Enter your email"
        name="email"
        register={mockRegister as unknown as UseFormRegister<FieldValues>}
        errors={errorsWithField}
      />
    );

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toHaveClass('text-red-500');
  });

  it('should not display error message when there is no error for the field', () => {
    render(
      <LabelInput
        label="Email"
        placeholder="Enter your email"
        name="email"
        register={mockRegister as unknown as UseFormRegister<FieldValues>}
        errors={mockErrors}
      />
    );

    const errorMessage = screen.queryByText(/email is required/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('should apply custom className to the container', () => {
    const customClass = 'custom-class-name';

    render(
      <LabelInput
        label="Username"
        placeholder="Enter username"
        name="username"
        register={mockRegister as unknown as UseFormRegister<FieldValues>}
        errors={mockErrors}
        className={customClass}
      />
    );

    const container = screen.getByText('Username').parentElement;
    expect(container).toHaveClass(customClass);
  });

  it('should render with different input types', () => {
    const inputTypes = ['text', 'email', 'password', 'number', 'tel'];

    inputTypes.forEach((type) => {
      const { unmount } = render(
        <LabelInput
          label="Field"
          placeholder="Enter value"
          name="field"
          register={mockRegister as unknown as UseFormRegister<FieldValues>}
          errors={mockErrors}
          inputType={type}
        />
      );

      const input = screen.getByPlaceholderText('Enter value');
      expect(input).toHaveAttribute('type', type);

      unmount();
    });
  });

  it('should default to text type when inputType is not provided', () => {
    render(
      <LabelInput
        label="Username"
        placeholder="Enter username"
        name="username"
        register={mockRegister as unknown as UseFormRegister<FieldValues>}
        errors={mockErrors}
      />
    );

    const input = screen.getByPlaceholderText('Enter username');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should forward all input props correctly', () => {
    render(
      <LabelInput
        label="Password"
        placeholder="Enter password"
        name="password"
        register={mockRegister as unknown as UseFormRegister<FieldValues>}
        errors={mockErrors}
        inputType="password"
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('placeholder', 'Enter password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should handle register spread operator correctly', () => {
    const registerReturn = {
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'username',
      ref: jest.fn(),
    };

    const customRegister = jest.fn().mockReturnValue(registerReturn);

    render(
      <LabelInput
        label="Username"
        placeholder="Enter username"
        name="username"
        register={customRegister as unknown as UseFormRegister<FieldValues>}
        errors={mockErrors}
      />
    );

    expect(customRegister).toHaveBeenCalledWith('username');

    const input = screen.getByPlaceholderText('Enter username');
    expect(input).toHaveAttribute('name', 'username');
  });

  it('should display error message with proper styling', () => {
    const errorsWithField: FieldErrors<FieldValues> = {
      password: {
        message: 'Password must be at least 8 characters',
        type: 'minLength',
      },
    };

    render(
      <LabelInput
        label="Password"
        placeholder="Enter password"
        name="password"
        register={mockRegister as unknown as UseFormRegister<FieldValues>}
        errors={errorsWithField}
      />
    );

    const errorElement = screen.getByText(
      'Password must be at least 8 characters'
    );
    expect(errorElement).toBeInTheDocument();
    expect(errorElement.tagName).toBe('P');
    expect(errorElement).toHaveClass('text-sm');
    expect(errorElement).toHaveClass('text-red-500');
  });

  it('should handle multiple errors for different fields correctly', () => {
    const errorsWithMultipleFields: FieldErrors<FieldValues> = {
      username: {
        message: 'Username is required',
        type: 'required',
      },
      email: {
        message: 'Invalid email format',
        type: 'pattern',
      },
    };

    render(
      <>
        <LabelInput
          label="Username"
          placeholder="Enter username"
          name="username"
          register={mockRegister as unknown as UseFormRegister<FieldValues>}
          errors={errorsWithMultipleFields}
        />
        <LabelInput
          label="Email"
          placeholder="Enter email"
          name="email"
          register={mockRegister as unknown as UseFormRegister<FieldValues>}
          errors={errorsWithMultipleFields}
        />
      </>
    );

    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('should handle undefined error message gracefully', () => {
    const errorsWithUndefinedMessage: FieldErrors<FieldValues> = {
      field: {
        message: undefined,
        type: 'required',
      },
    };

    render(
      <LabelInput
        label="Field"
        placeholder="Enter value"
        name="field"
        register={mockRegister as unknown as UseFormRegister<FieldValues>}
        errors={errorsWithUndefinedMessage}
      />
    );

    const errorElements = screen.queryAllByText(/undefined/i);
    expect(errorElements.length).toBe(0);
  });

  it('should apply default spacing classes', () => {
    render(
      <LabelInput
        label="Username"
        placeholder="Enter username"
        name="username"
        register={mockRegister as unknown as UseFormRegister<FieldValues>}
        errors={mockErrors}
      />
    );

    const container = screen.getByText('Username').parentElement;
    expect(container).toHaveClass('space-y-2');
  });

  it('should merge custom className with default classes', () => {
    const customClass = 'mb-4';

    render(
      <LabelInput
        label="Username"
        placeholder="Enter username"
        name="username"
        register={mockRegister as unknown as UseFormRegister<FieldValues>}
        errors={mockErrors}
        className={customClass}
      />
    );

    const container = screen.getByText('Username').parentElement;
    expect(container).toHaveClass('space-y-2');
    expect(container).toHaveClass(customClass);
  });
});
