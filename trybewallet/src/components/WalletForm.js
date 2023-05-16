import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses } from '../redux/actions/index';
import { fetchCurrency, fetchCurrencies } from './fetchCurrencies';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  dispensesButton = async (event) => {
    const { dispatch } = this.props;
    event.preventDefault();
    const currencyValue = await fetchCurrency();
    this.setState({
      exchangeRates: currencyValue,
    });

    dispatch(addExpenses(this.state));
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: '',
    });
  };

  render() {
    const { wallet } = this.props;
    const { currencies } = wallet;
    const { value, method, tag, description, currency } = this.state;

    return (
      <div className="form-container">
        <form
          onSubmit={this.dispensesButton}
          className="wallet-form"
        >
          <div className="div-form">
            <label htmlFor="value">
              Value
              <br />
              <input
                value={value}
                name="value"
                onChange={this.handleChange}
                key="value"
                className="value-input"
                type="number"
                data-testid="value-input"
              />
            </label>
            <div className="currency-select">
              <label htmlFor="currency">
                Currency
                <br />
                <select
                  onChange={this.handleChange}
                  value={currency}
                  name="currency"
                  key="currency"
                  data-testid="currency-input"
                >
                  {currencies.map((coin, index) => (
                    <option key={index}>
                      {coin}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Payment method
              <br />
              <select
                required
                name="method"
                value={method}
                onChange={this.handleChange}
                key="method"
                data-testid="method-input"
              >
                <option value="Dinheiro">
                  Cash
                </option>
                <option value="Cartão de crédito">
                  Credit card
                </option>
                <option value="Cartão de débito">
                  Debit card
                </option>
              </select>
            </label>
            <label>
              Category
              <br />
              <select
                required
                name="tag"
                value={tag}
                onChange={this.handleChange}
                key="tag"
                data-testid="tag-input"
              >
                <option value="Alimentação">
                  Food
                </option>
                <option value="Lazer">
                  Leisure
                </option>
                <option value="Trabalho">
                  Job
                </option>
                <option value="Transporte">
                  Transport
                </option>
                <option value="Saúde">
                  Health
                </option>
              </select>
            </label>
            <label htmlFor="description">
              Description
              <br />
              <input
                required
                onChange={this.handleChange}
                name="description"
                value={description}
                key="description"
                type="text"
                data-testid="description-input"
              />
            </label>
            <button
              className="dispense-button"
              type="submit"
            >
              Add dispense
            </button>
          </div>
        </form >
      </div>
    );
  }
}

WalletForm.propTypes = {
  wallet: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps, null)(WalletForm);
