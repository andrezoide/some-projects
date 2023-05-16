import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    artistName: '',
    artistSave: '',
    searchButton: '',
    loading: false,
    albuns: [],
  }

  nameInputHandler = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  artistSearch = async (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    const { artistName } = this.state;
    this.setState({
      albuns: await searchAlbumsAPI(artistName),
      artistName: '',
      loading: false,
      artistSave: artistName,
    });
  }

  render() {
    const minLength = 2;
    const { artistName, searchButton, albuns, loading, artistSave } = this.state;
    const modifiedAlbuns = albuns.map((album) => (
      <div key={ album.collectionId }>
        <Link
          data-testid={ `link-to-album-${album.collectionId}` }
          to={ `/album/${album.collectionId}` }
        >
          <img src={ album.artworkUrl100 } alt="imagem" />
          <h1>{ album.collectionName }</h1>
          <h2>{ album.artistName }</h2>
        </Link>
      </div>
    ));

    return (
      <div className="container">
        <Header />
        { loading === true ? (<Loading />) : (
          <div className="search-bar" data-testid="page-search">
            <label htmlFor="artistName">
              <input
                id="artistName"
                name="artistName"
                value={ artistName }
                onChange={ this.nameInputHandler }
                className="input-search"
                placeholder="Search for an Artist"
                data-testid="search-artist-input"
                type="text"
              />
            </label>
            <button
              onClick={ this.artistSearch }
              value={ searchButton }
              disabled={ artistName.length < minLength }
              className="search-button"
              type="button"
              data-testid="search-artist-button"
            >
              Search
            </button>
          </div>
        )}

        <div>
          <h2>{ `Resultado de álbuns de: ${artistSave}` }</h2>
          { albuns.length > 0 ? modifiedAlbuns : <p>Nenhum álbum foi encontrado</p> }
        </div>
      </div>
    );
  }
}

export default Search;
