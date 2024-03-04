/*
Name: Raghav Malhotra
Student ID: 153547211
Course: PRJ666 ZAA
Professor: Clint MacDonald
*/

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
