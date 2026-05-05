import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Auth from './Auth';

// Mock useNavigate and useLocation
const mockNavigate = vi.fn();
const mockLocation = vi.fn().mockReturnValue({ pathname: '/login' });

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation(),
  };
});

// Mock fetch
global.fetch = vi.fn();

describe('Auth Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mockLocation.mockReturnValue({ pathname: '/login' });
  });

  it('renders login form by default', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Auth />
      </MemoryRouter>
    );

    // Both login and register are in DOM, so we use All and pick index 0 for login
    expect(screen.getAllByPlaceholderText('Email')[0]).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('Password')[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const fakeResponse = {
      token: 'fake-token',
      user: { email: 'test@example.com', id: '123' },
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => fakeResponse,
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Auth />
      </MemoryRouter>
    );

    fireEvent.change(screen.getAllByPlaceholderText('Email')[0], { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getAllByPlaceholderText('Password')[0], { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-token');
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('displays error on failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Auth />
      </MemoryRouter>
    );

    fireEvent.change(screen.getAllByPlaceholderText('Email')[0], { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getAllByPlaceholderText('Password')[0], { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('validates password match during registration', async () => {
    mockLocation.mockReturnValue({ pathname: '/register' });

    render(
      <MemoryRouter initialEntries={['/register']}>
        <Auth />
      </MemoryRouter>
    );

    // Fill registration form (index 1 for email/password in register form)
    fireEvent.change(screen.getAllByPlaceholderText('Email')[1], { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getAllByPlaceholderText('Password')[1], { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm-password'), { target: { value: 'mismatch' } });
    
    // Select gender (required field)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'male' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });
});
