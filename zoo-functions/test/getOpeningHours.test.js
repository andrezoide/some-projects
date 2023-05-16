const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  it('testa se getOpeningHours é uma função', () => {
    expect(typeof getOpeningHours).toBe('function');
  });

  it('testa se nao receber nenhum parametro retorna o esperado', () => {
    const expectt = {
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    };
    expect(getOpeningHours()).toMatchObject(expectt);
  });

  it('testa o dia da semana. Se ao receber como parametro diaSemana e hora retorna uma msg de error', () => {
    const weekDay = 'quinta';
    const hour = 12;
    const error = 'The day must be valid. Example: Monday';
    expect(() => getOpeningHours(weekDay, hour)).toThrow(error);
  });

  it('testa a hora. Se ao receber como parametro diaSemana e hora retorna uma msg de error', () => {
    const weekDay = 'Friday';
    const hour = 'xx:xx';
    const error = 'The hour should represent a number';
    expect(() => getOpeningHours(weekDay, hour)).toThrow(error);
  });

  it('testa o minuto. Se ao receber como parametro diaSemana e hora retorna uma msg de error', () => {
    const weekDay = 'Friday';
    const hour = '12:xx';
    const error = 'The minutes should represent a number';
    expect(() => getOpeningHours(weekDay, hour)).toThrow(error);
  });

  it('testa a abreviação. Se o formato da hora não AM ou PM retorna uma msg de error', () => {
    const weekDay = 'Friday';
    const hour = '12:00-xx';
    const error = 'The abbreviation must be \'AM\' or \'PM\'';
    expect(() => getOpeningHours(weekDay, hour)).toThrow(error);
  });

  it('testa se a hora esta dentro da range esperada e retorna uma msg de error', () => {
    const weekDay = 'Friday';
    const hour = '33:00-AM';
    const error = 'The hour must be between 0 and 12';
    expect(() => getOpeningHours(weekDay, hour)).toThrow(error);
  });

  it('testa se a minuto esta dentro da range esperada e retorna uma msg de error', () => {
    const WeekDay = 'Friday';
    const hour = '01:62-AM';
    const error = 'The minutes must be between 0 and 59';
    expect(() => getOpeningHours(WeekDay, hour)).toThrow(error);
  });

  it('testa se ao receber parametros retorna o zoologico está aberto ou não', () => {
    const weekDay = 'Friday';
    const hour = '01:30-AM';
    const string = 'The zoo is closed';
    expect(getOpeningHours(weekDay, hour)).toEqual(string);

    const weekDayy = 'Friday';
    const hourr = '01:30-PM';
    const stringg = 'The zoo is open';
    expect(getOpeningHours(weekDayy, hourr)).toEqual(stringg);

    const weekDayyy = 'Monday';
    const hourrr = '09:30-AM';
    const stringgg = 'The zoo is closed';
    expect(getOpeningHours(weekDayyy, hourrr)).toEqual(stringgg);
  });
});
