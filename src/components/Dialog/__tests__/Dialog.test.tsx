import { test, expect } from 'vitest';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from '../Dialog';
import App from '../../../App';

/**
 * @vitest-environment jsdom
 */

describe('<Dialog />', () => {
  test('Renders with title and body content', () => {
    render(
      <Dialog
        title='test-title'
        closeButton={false}
        open
      >
        test-content
      </Dialog>,
    );

    const dialogTitle = screen.getByRole('heading', { name: 'test-title' });
    expect(dialogTitle).toBeInTheDocument();

    const dialogContent = screen.getByText('test-content');
    expect(dialogContent).toBeInTheDocument();
  });
  test('Can be opened and closed', async () => {
    render(<App />);
    const user = userEvent.setup();

    const dialogContent = await screen.getByRole('button', {
      name: 'Open test dialog',
    });
    expect(dialogContent).toBeInTheDocument();
    await user.click(dialogContent);

    const header = screen.getByRole('heading', { name: 'Test dialog title' });
    expect(header).toBeInTheDocument();
    const closeButton = screen.getByLabelText('close');
    await user.click(closeButton);
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
