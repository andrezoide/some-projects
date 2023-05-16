import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import About from '../pages/About';

describe('Testes requisito 2', () => {
  it(
    'testa se o caminho de "/about" esta correto e se o texto:"About Pokédex" em um h2',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToAbout = screen.getByRole('link', { name: /About/i });
      expect(linkToAbout).toBeDefined();

      userEvent.click(linkToAbout);

      const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
      expect(history.location.pathname).toBe('/about');
      expect(title).toBeDefined();
    },
  );

  it(
    'testa se o caminho de src de uma imagem em /about contem o URL correto',
    () => {
      const { getByAltText } = renderWithRouter(<About />);
      const img = getByAltText('Pokédex');

      expect(img.src).toContain(
        'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
      );
      expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    },
  );

  it(
    'testa se a página contém as informações sobre a Pokédex',
    () => {
      renderWithRouter(<App />);
      const linkToAbout = screen.getByRole('link', { name: /About/i });
      expect(linkToAbout).toBeDefined();

      userEvent.click(linkToAbout);

      const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
      expect(title).toBeDefined();
    },
  );

  it(
    'testa se a página contém dois parágrafos com texto sobre a Pokédex',
    () => {
      renderWithRouter(<About />);
      const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
      const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);

      expect(firstParagraph).toBeInTheDocument();
      expect(secondParagraph).toBeInTheDocument();
    },
  );
});
