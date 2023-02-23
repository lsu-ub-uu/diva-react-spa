import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TabsMenu } from '../TabsMenu';

/**
 * @vitest-environment jsdom
 */
describe('TabsMenu', () => {
  test('TabsMenu test', () => {
    render(<TabsMenu />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    const tabsTexts = tabs.map((element) => element.id);
    expect(tabsTexts).toEqual([
      'Registrera & hantera',
      'Administrera',
      'Mina publikationer & projekt',
    ]);
  });
});
