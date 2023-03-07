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
