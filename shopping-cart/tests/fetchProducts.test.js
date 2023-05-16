require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const fetchSimulator = require('../mocks/fetchSimulator');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('testa se a função é realmente uma função', () => {
    expect.assertions(1);

    expect(typeof fetchProducts).toEqual('function');
  });

  it('testa se quando chamamos a função com o parametro "computador", retorna a fetch', async () => {
    expect.assertions(1);

    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('testa se ao chamar a função com o parametro "computador" a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    expect.assertions(1);

    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });

  it('testa se o retorno da função "fetchProducts" retorna um objeto igual ao "computadorSearch"', async () => {
    expect.assertions(1);

    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('testa se a função sem nenhum parametro retorna mensagem de erro', async () => {
    expect.assertions(1);
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  });

});
