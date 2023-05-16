import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpenses } from '../redux/actions';
import { fetchCurrencies } from './fetchCurrencies';

class EditForm extends Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  };

  componentDidMount() {
    const { fetchCurrency, expenses, idToEdit } = this.props;
    fetchCurrency();
    const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
    const { value, description, currency, method, tag } = expenseToEdit;
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  submitExpenseButton = () => {
    const { updateExpenses: editExpense, idToEdit, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
    const editedExpense = {
      ...expenseToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };
    editExpense(editedExpense);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div>
        <form className="expenseForm">
          <div className="editForm">
            <label
              htmlFor="value"
              className="expenseLabel"
            >
              Value
              <br />
              <input
                className="expenseValue"
                data-testid="value-input"
                type="number"
                id="value-input"
                name="value"
                onChange={this.handleInputChange}
                value={value}
              />
            </label>

            <label
              htmlFor="currency"
              className="expenseLabel"
            >
              Currency
              <br />
              <select
                className="expenseCurrency"
                data-testid="currency-input"
                name="currency"
                id="currency-input"
                onChange={this.handleInputChange}
                value={currency}
              >
                {currencies.map((code, index) => (
                  <option key={index} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </label>

            <label
              htmlFor="method"
              className="expenseLabel"
            >
              Payment method
              <br />
              <select
                className="expenseMethod"
                data-testid="method-input"
                name="method"
                id="method-input"
                onChange={this.handleInputChange}
                value={method}
              >
                <option value="Dinheiro">Cash</option>
                <option value="Cartão de crédito">Credit card</option>
                <option value="Cartão de débito">Debit card</option>
              </select>
            </label>

            <label
              htmlFor="tag"
              className="expenseLabel"
            >
              Category
              <br />
              <select
                className="expenseTag"
                data-testid="tag-input"
                name="tag"
                id="tag-input"
                onChange={this.handleInputChange}
                value={tag}
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>

            <label
              htmlFor="description"
              className="expenseLabel"
            >
              Description
              <br />
              <input
                className="expenseDescription"
                data-testid="description-input"
                type="text"
                id="description-input"
                name="description"
                onChange={this.handleInputChange}
                value={description}
              />
            </label>

            <button
              className="expenseButton"
              type="button"
              onClick={this.submitExpenseButton}
            >
              Edit dispense
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()),
  updateExpenses: (expense) => dispatch(updateExpenses(expense)),
});

EditForm.propTypes = {
  fetchCurrency: PropTypes.func.isRequired,
  updateExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
    }),
  ).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
