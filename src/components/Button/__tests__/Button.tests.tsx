import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

/**
 * @vitest-environment jsdom
 */

test('1', () => {
  render(<Button />);
  const h = screen.queryByRole('button', { name: 'ok' });
  expect(h).toBeInTheDocument();
});
