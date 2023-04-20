import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';

/**
 * @vitest-environment jsdom
 */

describe('<Breadcrumbs />', () => {
  test('Renders', () => {
    render(
      <MemoryRouter initialEntries={['/page1/page1_1']}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    const breads = screen.getByText('page1_1');
    expect(breads).toBeInTheDocument();
  });
  test('Can take the user back to home page', () => {
    render(
      <MemoryRouter initialEntries={['/page1/page1_1']}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    expect(screen.getByText('start').closest('a')).toHaveAttribute('href', '/');
  });
});
