import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

// codigo baseado no codigo do F-Herbert
class Album extends Component {
  state = {
    albumInfos: {},
    musics: [],
    loading: false,
    favoriteMusicId: [],
  }

  toFavorite = async (obj) => {
    const { favoriteMusicId } = this.state;
    this.setState({ loading: true });
    await addSong(obj);
    this.setState({
      loading: false,
      favoriteMusicId: [...favoriteMusicId, obj.trackId],
    });
  }

  fromFavorite = async () => {
    const { favoriteMusicId } = this.state;
    this.setState({ loading: true });
    const result = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteMusicId: [...favoriteMusicId, ...result.map((music) => music.trackId)],
    });
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    this.musicsRequisition(id);
    this.fromFavorite();
  }

  musicsRequisition = async (id) => {
    this.setState({ loading: true });
    const albumResults = await getMusics(id);
    const { musics } = this.state;
    albumResults.forEach((result, index) => (
      (index === 0) ? this.albumInfos(result) : musics.push(result)));
    this.setState({
      loading: false,
    });
  }

  albumInfos = (info) => {
    this.setState({
      albumInfos: info,
    }, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { favoriteMusicId, albumInfos, musics, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <img src={ albumInfos.artworkUrl100 } alt="imagem" />
            <h2 data-testid="artist-name">
              { albumInfos.artistName }
            </h2>
            <h3 data-testid="album-name">{ albumInfos.collectionName }</h3>
            <div>
              { musics.map((music) => (
                <MusicCard
                  checked={ favoriteMusicId.some(
                    (favMusic) => music.trackId === favMusic,
                  ) }
                  toFavorite={ this.toFavorite }
                  musicObj={ music }
                  key={ music.trackNumber }
                  previewUrl={ music.previewUrl }
                  trackName={ music.trackName }
                  trackId={ music.trackId }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};

export default Album;
