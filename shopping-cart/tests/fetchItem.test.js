require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('testa se é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });

  it('testa se função retorna quando chamada com um item de parametro', async () => {
    expect.assertions(1);

    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('testa se função é chama com o url certo', async () => {
    expect.assertions(1);

    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('testa se função retorna objeto equivalente ao item', async () => {
    expect.assertions(1);

    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('testa se o mostra erro quando nao passamos parametro nenhum', async () => {
    expect.assertions(1);
    await expect(fetchItem()).rejects.toThrow('You must provide an url');
  });
});
