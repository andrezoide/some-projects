import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes requisito 3', () => {
  it(
    'testa se o texto do link:"No favorite...",aparece em na tela sem pokemons favoritos',
    () => {
      renderWithRouter(<App />);
      const linkToFavoritePokemons = screen.getByRole(
        'link', { name: /Favorite Pokémons/i },
      );
      expect(linkToFavoritePokemons).toBeDefined();

      userEvent.click(linkToFavoritePokemons);

      const title = screen.getByText(/No favorite pokemon found/);
      expect(title).toBeDefined();
    },
  );
});
