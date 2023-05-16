import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const MOCK_FETCH = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
};

describe('Testando a tela de Login', () => {  
  afterEach(() => { global.fetch.mockClear(); });
  
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_FETCH)
    })
  });

  test('Testando se são renderizados os inputs de nome, email e o botão de Play', () => {
    renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    const buttonConf = screen.getByRole('button', { name: /configurações/i } )

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonConf).toBeInTheDocument();

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(buttonPlay).toBeDisabled();

  })
  test('Testando se o botão Play é habilidado quando os inputs são digitados corretamente', () => {
   renderWithRouterAndRedux(<App />);

    const name = 'test';
    const email = 'alguem@test.com'

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
 

    expect(buttonPlay).toBeEnabled();

  })
  test('Testando se o botão Play permanece desabilitado quando possui algum input vazio', () => {
    renderWithRouterAndRedux(<App />);
    
    const nameFail = '';
    const email = 'alguem@test.com'

    const nameInput = screen.getByTestId("input-player-name");
    const emailInput = screen.getByTestId("input-gravatar-email");
    const buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(nameInput, nameFail);
    userEvent.type(emailInput, email);

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('alguem@test.com');
    expect(buttonPlay).toBeDisabled();
  })
  test('Testando se o botão de Play faz a requisição', () => {
    renderWithRouterAndRedux(<App />);

    const name = 'test';
    const email = 'alguem@test.com'

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
    userEvent.click(buttonPlay);

    const urlToken = 'https://opentdb.com/api_token.php?command=request';

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6' }),
    });

    expect(global.fetch).toBeCalledWith(urlToken);

  })
  test('Testando se o botão de Configurações redireciona para a página correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonConf = screen.getByRole('button', { name: /configurações/i } )
    
    userEvent.click(buttonConf)
    expect(history.location.pathname).toBe('/settings');
  })
})
