import React from 'react';
import { render } from '@testing-library/react';
import App from './components/App';

test('renders search text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Search Weather/i);
  expect(linkElement).toBeInTheDocument();
});
