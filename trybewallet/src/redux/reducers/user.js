import { VALID_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case VALID_EMAIL:
    return { ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

// Esse reducer será responsável por tratar as informações da pessoa usuária

export default user;
