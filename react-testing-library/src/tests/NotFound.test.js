import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testes requisito 4', () => {
  it(
    'testa se o texto:"Page requested not found" aparece em um h2',
    () => {
      renderWithRouter(<NotFound />);
      const title = screen.getByRole(
        'heading', {
          name: /Page requested not found/i, level: 2,
        },
      );
      expect(title).toBeDefined();
    },
  );

  it(
    'testa se existe uma imagem sendo renderizada',
    () => {
      const { getByAltText } = renderWithRouter(<NotFound />);
      const img = getByAltText('Pikachu crying because the page requested was not found');

      expect(img.src).toContain(
        'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
      );
      expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    },
  );
});
