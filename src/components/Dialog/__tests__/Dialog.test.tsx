import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Dialog } from '../Dialog';

/**
 * @vitest-environment jsdom
 */

describe('<Dialog />', () => {
  test('Renders with title and body content', () => {
    render(
      <Dialog
        title='test-title'
        closeButton={false}
        open
      >
        test-content
      </Dialog>,
    );

    const dialogTitle = screen.getByRole('heading', { name: 'test-title' });
    expect(dialogTitle).toBeInTheDocument();

    const dialogContent = screen.getByText('test-content');
    expect(dialogContent).toBeInTheDocument();
  });
});
