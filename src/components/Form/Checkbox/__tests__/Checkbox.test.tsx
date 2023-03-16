import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '../Checkbox';

/**
 * @vitest-environment jsdom
 */

describe('<Checkbox />', () => {
  test('Renders', () => {
    render(
      <form>
        <FormControlLabel
          value='female'
          control={<Checkbox />}
          label='Female'
        />
      </form>,
    );
    const button = screen.getByLabelText('Female');
    expect(button).toBeInTheDocument();
  });
});
