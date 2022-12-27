import { screen, waitFor } from '@testing-library/react';

import Home from '../Home';
import { renderWithProvidersAndRouter } from '../../utils/test-utils/renderWithProviders';

it('renders Loading component and Home component text elements, then links to levels', async () => {
  renderWithProvidersAndRouter(<Home />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  expect(
    screen.getByRole('heading', {
      name: /it's all about finding the characters/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/After you select a level, click on the screen/i)
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByRole('link', { name: /beach/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /stadium/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /space/i })).toBeInTheDocument();
  });
});
