import { screen } from '@testing-library/react';
import Header from '../Header';
import { renderWithProvidersAndRouter } from '../../utils/test-utils/renderWithProviders';

it('renders Header component links', () => {
  renderWithProvidersAndRouter(<Header />);

  expect(
    screen.getByRole('link', { name: /where's wally/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /high scores/i })
  ).toBeInTheDocument();
});
