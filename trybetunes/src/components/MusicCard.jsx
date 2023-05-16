import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, toFavorite, musicObj, checked } = this.props;

    return (
      <div data-testid="page-favorites">
        <h2>{ trackName }</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            id="favorite"
            type="checkbox"
            onChange={ () => toFavorite(musicObj) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  toFavorite: PropTypes.func.isRequired,
  musicObj: PropTypes.objectOf(PropTypes.string).isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
