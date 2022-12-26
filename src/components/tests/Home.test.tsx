import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, screen } from '@testing-library/react';

import Home from '../Home';
import { renderWithProviders } from '../../utils/test-utils/renderWithProviders';

export const handlers = [
  rest.get('*', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '4BBW4Eb1vJ80oyIrAROD',
          images: {
            url_small:
              'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fbeach-low.jpg?alt=media&token=8ca18ba7-fce3-4276-9dda-b917b0fe3d10',
            url_big:
              'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fbeach.jpg?alt=media&token=16055943-6bd2-4e0a-8fe8-accb176f6e2e',
          },
          name: 'Beach',
          characters_positions: [
            {
              position: [1084, 560],
              character_id: '15hg3If0JJaa3gXzfpow',
            },
            {
              position: [480, 517],
              character_id: '8LhDob2HJEjB5Gvi7s2u',
            },
            {
              character_id: 'tWH93mZU0sfqsPYC4ART',
              position: [188, 526],
            },
            {
              position: [1353, 575],
              character_id: 'xvke58nGthigfxFfvOTp',
            },
          ],
        },
        {
          id: 'HlepkVoPWLVtFac6ELiV',
          name: 'Stadium',
          characters_positions: [
            {
              position: [493, 504],
              character_id: '15hg3If0JJaa3gXzfpow',
            },
            {
              character_id: '8LhDob2HJEjB5Gvi7s2u',
              position: [1071, 1083],
            },
            {
              position: [1050, 846],
              character_id: 'tWH93mZU0sfqsPYC4ART',
            },
            {
              character_id: 'xvke58nGthigfxFfvOTp',
              position: [440, 931],
            },
          ],
          images: {
            url_big:
              'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fstadium.jpg?alt=media&token=09ad7ca1-753c-47db-883b-8141c8d232b0',
            url_small:
              'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fstadium-low.jpg?alt=media&token=ac9357d4-7fd6-4a08-adb5-07a1b6e98d80',
          },
        },
        {
          id: 'ThZl5MFX7zTlPYlCO9Q6',
          name: 'Space',
          images: {
            url_small:
              'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fspace-low.jpg?alt=media&token=32880dd2-2f8e-4c88-af56-69d835d8f291',
            url_big:
              'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fspace.jpg?alt=media&token=3a42a8ec-4c49-41ad-ac14-2f59d61bff13',
          },
          characters_positions: [
            {
              character_id: '15hg3If0JJaa3gXzfpow',
              position: [708, 846],
            },
            {
              position: [1366, 792],
              character_id: '8LhDob2HJEjB5Gvi7s2u',
            },
            {
              position: [124, 920],
              character_id: 'tWH93mZU0sfqsPYC4ART',
            },
            {
              position: [516, 728],
              character_id: 'xvke58nGthigfxFfvOTp',
            },
          ],
        },
      ]),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('test', async () => {
  renderWithProviders(<Home />);

  expect(screen.getByText(/beach/i)).toBeInTheDocument();
});
