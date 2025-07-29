import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../client/src/pages/home';

// Mock the API request function
vi.mock('../client/src/lib/queryClient', () => ({
  apiRequest: vi.fn(),
  queryClient: new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  }),
}));

// Mock react-hook-form toast
vi.mock('../client/src/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock framer motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('Contact Form', () => {
  let user: ReturnType<typeof userEvent.setup>;
  
  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
  });

  it('renders contact form with all required fields', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/business name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tell us about your business/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
      expect(screen.getByText(/business name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please provide more details/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    const emailField = screen.getByLabelText(/email/i);
    await user.type(emailField, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('validates message minimum length', async () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    const messageField = screen.getByLabelText(/tell us about your business/i);
    await user.type(messageField, 'Short');
    
    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please provide more details/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const { apiRequest } = await import('../client/src/lib/queryClient');
    const mockApiRequest = apiRequest as any;
    mockApiRequest.mockResolvedValue({
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours."
    });

    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/business name/i), 'Acme Corp');
    await user.type(screen.getByLabelText(/tell us about your business/i), 'We need a professional website for our growing business');

    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockApiRequest).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          company: 'Acme Corp',
          message: 'We need a professional website for our growing business'
        }
      });
    });
  });

  it('shows loading state during form submission', async () => {
    const { apiRequest } = await import('../client/src/lib/queryClient');
    const mockApiRequest = apiRequest as any;
    
    // Mock a slow response
    mockApiRequest.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000))
    );

    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    // Fill out and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/business name/i), 'Acme Corp');
    await user.type(screen.getByLabelText(/tell us about your business/i), 'We need a professional website for our growing business');

    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    // Check for loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('handles form submission errors gracefully', async () => {
    const { apiRequest } = await import('../client/src/lib/queryClient');
    const mockApiRequest = apiRequest as any;
    mockApiRequest.mockRejectedValue(new Error('Network error'));

    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    // Fill out and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/business name/i), 'Acme Corp');
    await user.type(screen.getByLabelText(/tell us about your business/i), 'We need a professional website for our growing business');

    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    // Form should handle error and remain interactive
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('clears form after successful submission', async () => {
    const { apiRequest } = await import('../client/src/lib/queryClient');
    const mockApiRequest = apiRequest as any;
    mockApiRequest.mockResolvedValue({
      success: true,
      message: "Thank you for your message!"
    });

    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    const nameField = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailField = screen.getByLabelText(/email/i) as HTMLInputElement;
    const companyField = screen.getByLabelText(/business name/i) as HTMLInputElement;
    const messageField = screen.getByLabelText(/tell us about your business/i) as HTMLTextAreaElement;

    // Fill out and submit form
    await user.type(nameField, 'John Doe');
    await user.type(emailField, 'john@example.com');
    await user.type(companyField, 'Acme Corp');
    await user.type(messageField, 'We need a professional website for our growing business');

    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);

    // Wait for form to clear after successful submission
    await waitFor(() => {
      expect(nameField.value).toBe('');
      expect(emailField.value).toBe('');
      expect(companyField.value).toBe('');
      expect(messageField.value).toBe('');
    });
  });
});