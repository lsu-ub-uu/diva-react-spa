import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Backdrop } from '../Backdrop';

/**
 * @vitest-environment jsdom
 */

describe('<Backdrop />', () => {
  test('Renders', () => {
    const { container } = render(<Backdrop open />);
    expect(container.getElementsByClassName('MuiBackdrop-root').length).toBe(1);
  });
});
