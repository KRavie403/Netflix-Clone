import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home text', () => {
  render(<App />);
  const homeText = screen.getByText(/home/i); // "home" 텍스트를 찾음
  expect(homeText).toBeInTheDocument();
});
