import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '@/test/pages/LoginPage';

describe('LoginPage', () => {
  it('renders inputs and login button', () => {
    render(<LoginPage onLogin={() => {}} />);
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('calls onLogin with username and password when submitted', () => {
    const mockLogin = jest.fn();
    render(<LoginPage onLogin={mockLogin} />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'tuan' }
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'secret123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith('tuan', 'secret123');
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

});
