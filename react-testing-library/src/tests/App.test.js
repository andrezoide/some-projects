import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes requisito 1', () => {
  it(
    'testa se o texto do link:"Home",aparece em App',
    () => {
      renderWithRouter(<App />);

      const homeTitle = screen.getByText(/Home/i);
      expect(homeTitle).toBeInTheDocument();
    },
  );

  it(
    'testa se o texto do link:"About",aparece em App',
    () => {
      renderWithRouter(<App />);

      const aboutTitle = screen.getByText(/About/i);
      expect(aboutTitle).toBeInTheDocument();
    },
  );

  it(
    'testa se o texto do link:"Favorite Pokémons",aparece em App',
    () => {
      renderWithRouter(<App />);

      const favoriteTitle = screen.getByText(/Favorite Pokémons/i);
      expect(favoriteTitle).toBeInTheDocument();
    },
  );

  it(
    'testa se o caminho de "/" esta correto e se contem o texto:"Encoutered Pokémons',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToHome = screen.getByRole('link', { name: /Home/i });
      expect(linkToHome).toBeDefined();

      userEvent.click(linkToHome);

      const title = screen.getByRole('heading', { name: /Encountered Pokémons/i });
      expect(history.location.pathname).toBe('/');
      expect(title).toBeDefined();
    },
  );

  it(
    'testa se o caminho de "/favorites" esta correto e contem o texto:"Favorite pokémons',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToPokemon = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(linkToPokemon).toBeDefined();

      userEvent.click(linkToPokemon);

      const title = screen.getByRole('heading', { name: /Favorite pokémons/i });
      expect(history.location.pathname).toBe('/favorites');
      expect(title).toBeDefined();
    },
  );

  it(
    'testa se o caminho de "/about" esta correto',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToAbout = screen.getByRole('link', { name: /About/i });
      expect(linkToAbout).toBeDefined();

      userEvent.click(linkToAbout);

      const title = screen.getByRole('heading', { name: /About/i });
      expect(history.location.pathname).toBe('/about');
      expect(title).toBeDefined();
    },
  );
});
