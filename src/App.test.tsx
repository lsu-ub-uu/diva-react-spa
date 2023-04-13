import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * @vitest-environment jsdom
 */
describe('<App />', () => {
  test.skip('1', () => {
    render(<App />);
    const h = screen.queryByRole('heading', { name: 'Vite + React' });
    expect(h).toBeInTheDocument();
  });

  test.skip('2', () => {
    expect(true).toBe(true);
  });
});
