import { useEffect, useState } from 'react';
import { test, expect } from 'vitest';
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
  test('Renders with given children content', async () => {
    render(<TestableAsidePortal />);
    const content = screen.getByText('works');
    expect(content).toBeInTheDocument();
  });
});
