// Coloque aqui suas actions
export const VALID_EMAIL = 'VALID_EMAIL';
export const GET_COIN = 'GET_COIN';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const getCoin = (currency) => ({
  type: GET_COIN,
  currency,
});

export const validEmailChange = (email) => ({
  type: VALID_EMAIL,
  email,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const removeExpenses = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export const editExpenses = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const updateExpenses = (expense) => ({
  type: UPDATE_EXPENSE,
  expense,
});
