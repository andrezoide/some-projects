import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validEmailChange } from '../redux/actions/index';
import './login.css';
import Loading from './Loading';
import fundo from '../fundo.png';
import carteira from '../carteira.png'

class Login extends Component {
  state = {
    email: '',
    password: '',
    toDisable: true,
    loading: false,
  };

  // inspirado no Danilo Ramalho
  validateEmail = () => {
    this.setState(({ email, password }) => {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const minLength = 6;
      const validPassword = password.length >= minLength;

      if (validEmail && validPassword) {
        return { toDisable: false };
      }
      return { toDisable: true };
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateEmail();
  };

  onClickButton = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    setTimeout(() => {
      history.push('/carteira');
    }, 2000)
    this.setState({
      loading: true,
    });
    dispatch(validEmailChange(email));
    
  };

  render() {
    const { email, password, toDisable, loading } = this.state;
    if (loading === true) return <Loading />;
    return (
      <div
        className="container-login">
          <img
            className="background-image"
           src={ fundo } />
           <img src={ carteira } className="wallet-image" />
        <form onSubmit={this.onClickButton}>
          <div className="box-login">
            <div className="input-box">
              <input
                required="required"
                value={email}
                name="email"
                onChange={this.handleChange}
                data-testid="email-input"
                type="email"
                key="email"
                className="input-email"
              />
              <span>
                EMAIL ADDRESS
              </span>
            </div>
            <div className="input-box">
              <input
                required="required"
                value={password}
                name="password"
                onChange={this.handleChange}
                data-testid="password-input"
                type="password"
                key="password"
                className="input-password"
              />
              <span>
                PASSWORD
              </span>
            </div>
            <div className="enter-button">
              <button
                disabled={toDisable}
                onClick={this.onClickButton}
                className="login-button"
                type="submit"
              >
                LOG IN
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
