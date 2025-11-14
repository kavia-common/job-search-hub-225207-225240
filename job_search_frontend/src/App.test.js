import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByText(/Saved/i)).toBeInTheDocument();
  expect(screen.getByText(/Applications/i)).toBeInTheDocument();
  expect(screen.getByText(/Alerts/i)).toBeInTheDocument();
});
