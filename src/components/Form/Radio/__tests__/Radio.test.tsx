import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormControlLabel } from '@mui/material';
import { Radio } from '../Radio';

/**
 * @vitest-environment jsdom
 */

describe('<Radio />', () => {
  test('Renders', () => {
    render(
      <form>
        <FormControlLabel
          value='female'
          control={<Radio />}
          label='Female'
        />
      </form>,
    );
    const button = screen.getByLabelText('Female');
    expect(button).toBeInTheDocument();
  });
});
