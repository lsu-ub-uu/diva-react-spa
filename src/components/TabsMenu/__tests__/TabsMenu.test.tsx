import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabsMenu } from '../TabsMenu';

/**
 * @vitest-environment jsdom
 */
describe('TabsMenu', () => {
  test('TabsMenu renders', () => {
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
  test('Tabs change when clicked', async () => {
    render(<TabsMenu />);
    const user = userEvent.setup();

    const administrera = screen.getByRole('tab', {
      name: /administrera/i,
    });

    await user.click(administrera);
    const administreraText = screen.getByText('Administrera');
    expect(administreraText).toHaveTextContent('Administrera');
  });
  test('Tabs change when clicked and then back when clicked again', async () => {
    render(<TabsMenu />);
    const user = userEvent.setup();

    const registrera = screen.getByRole('tab', {
      name: /Registrera & hantera/i,
    });
    const administrera = screen.getByRole('tab', {
      name: /administrera/i,
    });
    expect(registrera).toBeInTheDocument();

    await user.click(administrera);
    const administreraText = screen.getByText('Administrera');
    expect(administreraText).toHaveTextContent('Administrera');

    await user.click(registrera);
    const registreraText = screen.getByText('Registrera & hantera');
    expect(registreraText).toHaveTextContent('Registrera & hantera');
  });
});
