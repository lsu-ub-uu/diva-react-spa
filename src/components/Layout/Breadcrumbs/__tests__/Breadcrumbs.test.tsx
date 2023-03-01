import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../Breadcrumbs';
import { MemoryRouter } from 'react-router-dom';

/**
 * @vitest-environment jsdom
 */

describe('Breadcrumbs', () => {
  test('Breadcrumbs renders', () => {
    render(
      <MemoryRouter initialEntries={['/page1/page1_1']}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    const breads = screen.getByText('page1_1');
    expect(breads).toBeInTheDocument();
  });
  test('Breadcrumbs can take the user back to home page', () => {
    render(
      <MemoryRouter initialEntries={['/home/page1/page1_1']}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    expect(screen.getByText('home').closest('a')).toHaveAttribute(
      'href',
      '/home',
    );
  });
});
