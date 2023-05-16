import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes requisito 6', () => {
  test('testa se é exibido a imagem, tipo e texto alternativo do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /More Details/i });
    expect(linkMoreDetails).toBeDefined();

    expect(history.location.pathname).toBe('/');

    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');

    const pokemonImage = screen.getByAltText('Pikachu sprite');
    const pokemonType = screen.getAllByText('Electric');
    expect(pokemonType).toBeDefined();

    expect(pokemonImage.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('testa se ao favoritar pokemon, aparece icone de uma estrela ao lado dele', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /More Details/i });
    expect(linkMoreDetails).toBeDefined();

    expect(history.location.pathname).toBe('/');

    userEvent.click(linkMoreDetails);

    expect(history.location.pathname).toBe('/pokemons/25');

    const favoriteButton = screen.getByRole('checkbox');
    userEvent.click(favoriteButton);
    const icone = screen.getByAltText('Pikachu is marked as favorite');
    expect(icone.src).toContain('/star-icon.svg');
  });
});
