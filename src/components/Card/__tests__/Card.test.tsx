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

import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

/**
 * @vitest-environment jsdom
 */

export const TestableCard = () => {
  return (
    <Card
      title='Card title'
      variant='variant1'
      tooltipTitle='Title'
      tooltipBody='Body'
    >
      test content
    </Card>
  );
};

describe('<Card />', () => {
  test('Renders', () => {
    render(<TestableCard />);

    const testTitle = 'Card title';
    const titleText = screen.getByText(testTitle);
    expect(titleText).toHaveTextContent(testTitle);

    const testContent = 'test content';
    const contentText = screen.getByText(testContent);
    expect(contentText).toHaveTextContent(testContent);
  });
});
