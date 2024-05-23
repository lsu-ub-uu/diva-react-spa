/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabsMenu } from '../TabsMenu';
import { reduxRender } from '../../../utils/testUtils';

/**
 * @vitest-environment jsdom
 */
describe('TabsMenu', () => {
  it('TabsMenu renders', () => {
    reduxRender(<TabsMenu />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    const tabsTexts = tabs.map((element) => element.id);
    expect(tabsTexts).toEqual([
      'Registrera & hantera',
      'Administrera',
      'Mina publikationer & projekt',
    ]);
  });
  it('Tabs change when clicked', async () => {
    render(<TabsMenu />);
    const user = userEvent.setup();

    const administrera = screen.getByRole('tab', {
      name: /administrera/i,
    });

    await user.click(administrera);
    const administreraText = screen.getByText('Administrera');
    expect(administreraText).toHaveTextContent('Administrera');
  });
  it('Tabs change when clicked and then back when clicked again', async () => {
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
