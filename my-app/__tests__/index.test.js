import { render, screen, fireEvent, act } from '@testing-library/react'
import LoginForm from "../components/LoginForm";
import '@testing-library/jest-dom/jest-globals';

describe('LoginForm', () => {
    it('renders a login form', () => {
        render(<LoginForm />)

        expect(screen.getByTestId('login-button')).toHaveTextContent('Log in');
        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();

    });

    it('Testing email and password input', async () => {
        render(<LoginForm />);

        await act(async () => {
            fireEvent.change(screen.getByTestId("email-input"), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByTestId("password-input"), { target: { value: 'TestPassword1234' } });
        });

        expect(screen.getByTestId("email-input")).toHaveValue('test@example.com');
        expect(screen.getByTestId("password-input")).toHaveValue('TestPassword1234');
    });

    it('displays error border on invalid input', async () => {
        render(<LoginForm />);
        await act(async () => {
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'invalid-email' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: '' } });
            fireEvent.click(screen.getByTestId('login-button'));
        });
        expect(screen.getByTestId('email-input')).toHaveClass('border border-red-500 transition-all duration-500');
        expect(screen.getByTestId('password-input')).toHaveClass('border border-red-500 transition-all duration-500');
    });

});