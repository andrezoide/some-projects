import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Search from './pages/Search';
import Carrinho from './pages/Carrinho';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetails';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            {/* <Route exact path="/" component={ Search } /> */}
            <Route exact path="/carrinho" component={ Carrinho } />
            <Route exact path="/" component={ ProductList } />
            <Route exact path="/product-details" component={ ProductDetail } />
            <Route path="/product-details/" component={ ProductDetails } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
