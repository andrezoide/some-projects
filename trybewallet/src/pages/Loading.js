import React, { Component } from 'react';
import loadingGif from '../loading.svg';
import './loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="back">
        <div className="loading.container">
          <img
            alt="Loading"
            className="loading"
            src={loadingGif} />
        </div>
      </div>
    );
  }
}

export default Loading;
