import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemon from '../data';

describe('Testes requisito 5', () => {
  const pokemonName = 'pokemon-name';
  const pokemonType = 'pokemon-type';

  it('testa se tem o texto "Encountered pokémons" e esta em um h2', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(title).toBeDefined();
  });

  it('testa se botão "All" esta funcionando', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeDefined();
  });

  it('testa se aparece o proximo pokemon quando clicamos no botão', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    const allButton = screen.getByRole('button', { name: /all/i });

    expect(nextButton).toBeDefined();
    const firstPokemonName = screen.getByTestId(pokemonName, { name: /Pikachu/i });
    const firstPokemonType = screen.getByTestId(pokemonType, { name: /Eletric/i });
    expect(firstPokemonName.textContent).toBe('Pikachu');
    expect(firstPokemonType.textContent).toBe('Electric');
    expect(allButton).toBeDefined();

    userEvent.click(nextButton);
    const secondPokemonName = screen.getByTestId(pokemonName, {
      name: /charmander/i,
    });
    const secondPokemonType = screen.getByTestId(pokemonType, { name: /fire/i });
    expect(secondPokemonName.textContent).toBe('Charmander');
    expect(secondPokemonType.textContent).toBe('Fire');
    expect(allButton).toBeDefined();

    userEvent.click(nextButton);
    const thirdPokemonName = screen.getByTestId(pokemonName, { name: /Caterpie/i });
    const thirdPokemonType = screen.getByTestId(pokemonType, { name: /bug/i });
    expect(thirdPokemonName.textContent).toBe('Caterpie');
    expect(thirdPokemonType.textContent).toBe('Bug');
    expect(allButton).toBeDefined();
  });

  it('testa se existe filtro para cada tipo de pokemon', () => {
    renderWithRouter(<App />);
    const removedDuplicateTypes = [...new Set(pokemon.map((value) => value.type))];
    const allTypeButtons = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    const dataIdButtons = [...allTypeButtons, allButton];
    const typeButtons = [...removedDuplicateTypes, allButton];

    expect(typeButtons.length)
      .toEqual(dataIdButtons.length);
    allTypeButtons.forEach((button) => {
      expect(allButton).toBeDefined();
      expect(removedDuplicateTypes).toContainEqual(button.textContent);
    });
  });

  it('testa se o botão de tipo pode ser resetado', () => {
    renderWithRouter(<App />);
    const bugButton = screen.getByRole('button', { name: /bug/i });
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(bugButton).toBeDefined();
    expect(allButton).toBeDefined();

    userEvent.click(bugButton);

    const bugPokemon = screen.getByTestId(pokemonName);
    const bugTypePokemon = screen.getByTestId(pokemonType);

    expect(bugPokemon.textContent).toBe('Caterpie');
    expect(bugTypePokemon.textContent).toBe('Bug');
    expect(allButton).toBeDefined();

    userEvent.click(allButton);

    const firstPokemonName = screen.getByTestId(pokemonName, { name: /pikachu/i });
    const firstPokemonType = screen.getByTestId(pokemonType, { name: /Eletric/i });
    expect(firstPokemonName.textContent).toBe('Pikachu');
    expect(firstPokemonType.textContent).toBe('Electric');
    expect(allButton).toBeDefined();
  });
});
