import {
  GET_COIN, ADD_EXPENSES, REMOVE_EXPENSE, UPDATE_EXPENSE, EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_COIN: return {
    ...state,
    currencies: Object.keys(action.currency).filter((coin) => coin !== 'USDT'),
  };
  case ADD_EXPENSES: return {
    ...state,
    expenses: [...state.expenses.filter((obj) => obj.currency !== ''),
      { id: state.expenses.length, ...action.expenses }],
  };
  case REMOVE_EXPENSE: return {
    ...state,
    expenses: state.expenses.filter((item) => item.id !== action.id),
  };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case UPDATE_EXPENSE: return {
    ...state,
    expenses: state.expenses.map((expense) => {
      if (expense.id === action.expense.id) {
        return { ...action.expense };
      }
      return expense;
    }),
    editor: false,
  };
  default:
    return state;
  }
};

export default wallet;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
