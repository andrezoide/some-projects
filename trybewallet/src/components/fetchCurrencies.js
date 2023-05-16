import { getCoin } from '../redux/actions';

export const fetchCurrency = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetchCurrency();
    dispatch(getCoin(response));
  } catch (error) {
    return error;
  }
};
