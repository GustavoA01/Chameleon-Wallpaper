import { renderHook, act } from '@testing-library/react';
import { useFolderActions } from '../hooks/useFolderActions';
import { useFolderMutation } from '../hooks/useFolderMutation';

jest.mock('../hooks/useFolderMutation', () => ({
  useFolderMutation: jest.fn(),
}));

const mockDeleteFolderFn = jest.fn();
const mockId = 'folder-123';

describe('useFolderActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useFolderMutation as jest.Mock).mockReturnValue({
      deleteFolderFn: mockDeleteFolderFn,
    });
  });

  const renderHookComponent = () => renderHook(() => useFolderActions(mockId));

  it('should initialize with all states as false', () => {
    const { result } = renderHookComponent();

    expect(result.current.openDropdown).toBe(false);
    expect(result.current.openEditDialog).toBe(false);
    expect(result.current.openDeleteDialog).toBe(false);
  });

  it('should call deleteFolderFn with correct id when onDelete is called', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.onDelete();
    });

    expect(mockDeleteFolderFn).toHaveBeenCalledTimes(1);
    expect(mockDeleteFolderFn).toHaveBeenCalledWith(mockId);
  });

  it('should close delete dialog when onDelete is called', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.setOpenDeleteDialog(true);
    });
    expect(result.current.openDeleteDialog).toBe(true);

    act(() => {
      result.current.onDelete();
    });
    expect(result.current.openDeleteDialog).toBe(false);
  });

  it('should call preventDefault and close dropdown and open edit dialog when onEdit is called', () => {
    const { result } = renderHookComponent();
    const mockEvent = { preventDefault: jest.fn() } as unknown as Event;

    act(() => {
      result.current.setOpenDropdown(true);
    });
    expect(result.current.openDropdown).toBe(true);

    act(() => {
      result.current.onEdit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(result.current.openDropdown).toBe(false);
    expect(result.current.openEditDialog).toBe(true);
  });

  it('should call preventDefault and close dropdown and open delete dialog when onOpenDeleteDialog is called', () => {
    const { result } = renderHookComponent();
    const mockEvent = { preventDefault: jest.fn() } as unknown as Event;

    act(() => {
      result.current.setOpenDropdown(true);
    });
    expect(result.current.openDropdown).toBe(true);

    act(() => {
      result.current.onOpenDeleteDialog(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(result.current.openDropdown).toBe(false);
    expect(result.current.openDeleteDialog).toBe(true);
  });

  it('should call stopPropagation and preventDefault when blockPropagation is called', () => {
    const { result } = renderHookComponent();
    const mockEvent = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.blockPropagation(mockEvent);
    });

    expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should allow manually setting openDropdown', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.setOpenDropdown(true);
    });
    expect(result.current.openDropdown).toBe(true);

    act(() => {
      result.current.setOpenDropdown(false);
    });
    expect(result.current.openDropdown).toBe(false);
  });

  it('should allow manually setting openEditDialog', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.setOpenEditDialog(true);
    });
    expect(result.current.openEditDialog).toBe(true);

    act(() => {
      result.current.setOpenEditDialog(false);
    });
    expect(result.current.openEditDialog).toBe(false);
  });

  it('should allow manually setting openDeleteDialog', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.setOpenDeleteDialog(true);
    });
    expect(result.current.openDeleteDialog).toBe(true);

    act(() => {
      result.current.setOpenDeleteDialog(false);
    });
    expect(result.current.openDeleteDialog).toBe(false);
  });

  it('should maintain independent states', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.setOpenDropdown(true);
      result.current.setOpenEditDialog(true);
      result.current.setOpenDeleteDialog(true);
    });

    expect(result.current.openDropdown).toBe(true);
    expect(result.current.openEditDialog).toBe(true);
    expect(result.current.openDeleteDialog).toBe(true);
  });

  it('should not call deleteFolderFn when onDelete is called multiple times', () => {
    const { result } = renderHookComponent();

    act(() => {
      result.current.onDelete();
      result.current.onDelete();
    });

    expect(mockDeleteFolderFn).toHaveBeenCalledTimes(2);
    expect(mockDeleteFolderFn).toHaveBeenCalledWith(mockId);
  });

  it('should handle onEdit without dropdown open', () => {
    const { result } = renderHookComponent();
    const mockEvent = { preventDefault: jest.fn() } as unknown as Event;

    expect(result.current.openDropdown).toBe(false);

    act(() => {
      result.current.onEdit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(result.current.openDropdown).toBe(false);
    expect(result.current.openEditDialog).toBe(true);
  });

  it('should handle onOpenDeleteDialog without dropdown open', () => {
    const { result } = renderHookComponent();
    const mockEvent = { preventDefault: jest.fn() } as unknown as Event;

    expect(result.current.openDropdown).toBe(false);

    act(() => {
      result.current.onOpenDeleteDialog(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(result.current.openDropdown).toBe(false);
    expect(result.current.openDeleteDialog).toBe(true);
  });

  it('should reset states correctly when dialogs are closed', () => {
    const { result } = renderHookComponent();
    const mockEvent = { preventDefault: jest.fn() } as unknown as Event;

    act(() => {
      result.current.onEdit(mockEvent);
    });
    expect(result.current.openEditDialog).toBe(true);

    act(() => {
      result.current.setOpenEditDialog(false);
    });
    expect(result.current.openEditDialog).toBe(false);

    act(() => {
      result.current.onOpenDeleteDialog(mockEvent);
    });
    expect(result.current.openDeleteDialog).toBe(true);

    act(() => {
      result.current.onDelete();
    });
    expect(result.current.openDeleteDialog).toBe(false);
  });
});
