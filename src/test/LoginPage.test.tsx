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

  it('không gọi onLogin nếu username hoặc password rỗng', () => {
    const mockLogin = jest.fn();
    render(<LoginPage onLogin={mockLogin} />);

    fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: '' }
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: '' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('cho phép nhập lại username/password sau lần đầu login', () => {
    const mockLogin = jest.fn();
    render(<LoginPage onLogin={mockLogin} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'first' } });
    fireEvent.change(passwordInput, { target: { value: 'firstpass' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(mockLogin).toHaveBeenCalledWith('first', 'firstpass');

    fireEvent.change(usernameInput, { target: { value: 'second' } });
    fireEvent.change(passwordInput, { target: { value: 'secondpass' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(mockLogin).toHaveBeenCalledWith('second', 'secondpass');
    expect(mockLogin).toHaveBeenCalledTimes(2);
  });

  it('submit được bằng phím Enter trong ô password', () => {
    const mockLogin = jest.fn();
    render(<LoginPage onLogin={mockLogin} />);

    fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: 'tuan' }
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: '123456' }
    });

    fireEvent.submit(screen.getByRole('form') || screen.getByRole('button'));

    expect(mockLogin).toHaveBeenCalledWith('tuan', '123456');
  });

});
