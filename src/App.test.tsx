import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';

/**
 * @vitest-environment jsdom
 */

test('1', () => {
  render(<App />);
  const h = screen.getByRole('heading', { name: 'Vite + React' });
  expect(h).toBeInTheDocument();
});

test('2', () => {
  expect(true).toBe(true);
});
