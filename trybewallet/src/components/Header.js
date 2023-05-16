import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  componentDidMount() {
    this.finalValue();

  }

  componentDidUpdate() {
    this.finalValue();
  }
  // codigo inspirado no rafael brandão

  finalValue = () => {
    const { expenses } = this.props;
    let showValue = 0;
    if (expenses.length !== 0) {
      showValue = expenses.reduce((index, { value, currency, exchangeRates }) => {
        const total = index + (Number(value) * Number(exchangeRates[currency].ask));
        return total;
      }, 0);
    }
    return showValue;
  };

  render() {
    const { email } = this.props;
    return (
      <div
        className="header-wallet"
      >
        <div className="welcome">
          <h1> Welcome! </h1>
          <h4> {email} </h4>
          <h2> Total in BRL - R$ <p className="total"> {this.finalValue().toFixed(2)} </p></h2>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
