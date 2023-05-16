const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('testa se string retorna null', () => {
    expect(handlerElephants('string')).toBeNull();
  });

  it('testa se count retorn 4', () => {
    expect(handlerElephants('count')).toBe(4);
  });

  it('testa se averageAge retorna numero proximo a 10.5', () => {
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5);
  });

  it('testa se location retorna NW', () => {
    expect(handlerElephants('location')).toBe('NW');
  });

  it('testa se popularity retorna numero maior ou igual a 5', () => {
    expect(handlerElephants('popularity')).toBeGreaterThanOrEqual(5);
  });

  it('testa se sem parametro retorn undefined', () => {
    expect(handlerElephants()).toBeUndefined();
  });

  it('testa se handlerElephants(123) passando um numero ele retorna uma mensagem', () => {
    const string = 'Parâmetro inválido, é necessário uma string';
    expect(handlerElephants(123)).toEqual(string);
  });
});
