import { test, expect } from 'vitest';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '../Tooltip';

/**
 * @vitest-environment jsdom
 */

describe('<Tooltip />', () => {
  test('Renders tooltip when child button is clicked and can be closed', async () => {
    const user = userEvent.setup();
    const title = 'Test Title';
    const body = 'body content';
    render(
      <Tooltip
        title={title}
        body={body}
      >
        <span>click for tooltip</span>
      </Tooltip>,
    );

    const spanBtn = await screen.getByText('click for tooltip');
    expect(spanBtn).toBeInTheDocument();
    await user.click(spanBtn);

    const tooltip = screen.queryByRole('tooltip');
    expect(tooltip).toBeInTheDocument();

    const closeButton = screen.getByLabelText('close');
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    await waitForElementToBeRemoved(() => screen.queryByRole('tooltip'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
