import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Добро пожаловать в приложение CyberTickets/i);
  expect(linkElement).toBeInTheDocument();
});
