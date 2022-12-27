import { screen, waitFor } from '@testing-library/react';

import { renderWithProvidersAndRouter } from '../../../utils/test-utils/renderWithProviders';
import HighScores from '../HighScores';

it('renders Loading component, then text elements in Table components', async () => {
  renderWithProvidersAndRouter(<HighScores />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /beach/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /stadium/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /space/i })).toBeInTheDocument();
    expect(screen.getAllByText(/no scores yet/i));
    expect(screen.getByText(/jack/i)).toBeInTheDocument();
  });
});
