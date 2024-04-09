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

import { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import { AsidePortal } from '../AsidePortal';

/**
 * @vitest-environment jsdom
 */

const TestableAsidePortal = () => {
  const [element, setElement] = useState<Element>();

  useEffect(() => {
    const el = document.getElementById('sidebar-content');
    if (el) setElement(el);
  }, []);

  return (
    <div>
      <aside id='sidebar-content' />
      <AsidePortal element={element}>
        <span>works</span>
      </AsidePortal>
    </div>
  );
};

describe('<AsidePortal />', () => {
  it('Renders with given children content', async () => {
    render(<TestableAsidePortal />);
    const content = screen.getByText('works');
    expect(content).toBeInTheDocument();
  });
});
