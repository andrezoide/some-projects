import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    user: '',
  }

  async componentDidMount() {
    const getLogin = await getUser();
    this.setState({ user: getLogin.name });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="container">
        <div className="header">
          <header className="header" data-testid="header-component">
            <span data-testid="header-user-name">
              {user ? <h2>{user}</h2> : <Loading />}
            </span>
          </header>
        </div>
        <div className="links">
          <div>
            <Link
              className="link-button"
              data-testid="link-to-search"
              to="/search"
            >
              Search
            </Link>
          </div>
          <div>
            <Link
              className="link-button"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favorites
            </Link>
          </div>
          <div>
            <Link
              className="link-button"
              data-testid="link-to-profile"
              to="/profile"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
