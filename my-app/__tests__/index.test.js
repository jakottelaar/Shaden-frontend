import { render, screen } from '@testing-library/react'
import LoginForm from "../components/LoginForm";

describe('LoginForm', () => {
    test('renders LoginForm component', () => {
        render(<LoginForm />);
        screen.debug();
    });
});