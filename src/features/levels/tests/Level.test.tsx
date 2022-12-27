import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import Layout from '../../../components/Layout';
import { renderWithProviders } from '../../../utils/test-utils/renderWithProviders';
import Level from '../Level';

beforeEach(() => {
  renderWithProviders(
    <MemoryRouter
      initialEntries={['/', '/level/4BBW4Eb1vJ80oyIrAROD']}
      initialIndex={1}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="level/:levelId" element={<Level />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
});

it('renders Loading component, then Timer component and Level component image', async () => {
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByTestId('timer')).toBeInTheDocument();
    expect(screen.getByAltText(/beach/i)).toBeInTheDocument();
  });
});

it('renders GuessButton component with hidden class, then after clicking the image renders without hidden class', async () => {
  await waitFor(() => {
    expect(screen.getByTestId('guess-button')).toHaveClass('hidden');
    userEvent.click(screen.getByAltText(/beach/i));
  });

  await waitFor(() => {
    expect(screen.getByTestId('guess-button')).not.toHaveClass('hidden');
  });
});
