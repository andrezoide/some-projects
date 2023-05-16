import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { removeExpenses, editExpenses } from '../redux/actions';
import store from '../redux/store';

class Table extends Component {
  onClickDeleteButton = (id) => {
    store.dispatch(removeExpenses(id));
  };

  render() {
    const { editExpense: edit } = this.props;
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <tbody>
            {expenses.map((item) => {
              const {
                currency,
                description,
                exchangeRates,
                id,
                method,
                tag,
                value,
              } = item;

              const { name, ask } = exchangeRates[currency];
              const exchange = parseFloat(ask).toFixed(2);
              const conversion = item.value * item.exchangeRates[item.currency].ask;
              const convertedValue = parseFloat(conversion).toFixed(2);
              const finalValue = parseFloat(value).toFixed(2);
              const real = 'Real';
              return (
                <div >
                  <tr
                    key={id}
                  >
                    <div className="table-list">
                      <div>
                        <h3>
                          Description
                          <br />
                          <br />
                        </h3>
                        <p> {description} </p>
                      </div>
                      <div>
                        <h3>
                          Category
                          <br />
                          <br />
                        </h3>
                        <p> {tag}</p>
                      </div>
                      <div>
                        <h3>
                          Payment method
                          <br />
                          <br />
                        </h3>
                        <p> {method} </p>
                      </div>
                      <div>
                        <h3>
                          Value
                          <br />
                          <br />
                        </h3>
                        <p> {finalValue} </p>
                      </div>
                      <div>
                        <h3>
                          Currency
                          <br />
                          <br />
                        </h3>
                        <p> {name} </p>
                      </div>
                      <div>
                        <h3>
                          Exchange used
                          <br />
                          <br />
                        </h3>
                        <p> {exchange} </p>
                      </div>
                      <div>
                        <h3>
                          Converted value
                          <br />
                          <br />
                        </h3>
                        <p> {convertedValue} </p>
                      </div>
                      <div>
                        <h3>
                          Conversion currency
                          <br />
                          <br />
                        </h3>
                        <p> {real} </p>
                      </div>
                      <button
                        className="edit-button"
                        type="button"
                        data-testid="edit-btn"
                        onClick={() => edit(id)}
                      >
                        Editar
                      </button>
                      <button
                        className="delete-button"
                        type="button"
                        data-testid="delete-btn"
                        onClick={() => this.onClickDeleteButton(id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </tr>
                </div>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: propTypes.instanceOf(Array).isRequired,
  editExpense: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id) => dispatch(editExpenses(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
