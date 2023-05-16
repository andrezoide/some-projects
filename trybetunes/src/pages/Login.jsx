import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    login: '',
    loading: false,
  }

  nameInputHandler = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  onClickButton = async () => {
    const { login } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: login });
    history.push('/search');
  }

  render() {
    const minLength = 3;
    const { login, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <div data-testid="page-login">
        <form>
          <div className="header-login">
            <div className="button-login">
              Login:
              <input
                className="input-login"
                name="login"
                onChange={ this.nameInputHandler }
                value={ login }
                placeholder="Digite seu nome"
                data-testid="login-name-input"
                id="login"
                type="text"
              />
              <button
                className="button-login"
                disabled={ login.length < minLength }
                data-testid="login-submit-button"
                type="button"
                onClick={ this.onClickButton }
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Login;
