import React, { Component } from 'react';
import './App.css';

import Spotify from '../../util/Spotify';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults:[

      ],
      playlistName: 'New playlist',
      playlistSongs: [

      ]
    };
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }
  addToPlaylist(id, song) {
    this.setState({...this.state, playlistSongs: [...this.state.playlistSongs, song]})
  }
  removeFromPlaylist(id) {
    this.setState({
      playlistSongs: this.state.playlistSongs.filter((_, i) => i !== id)
    });
  }
  searchSpotify(term) {
    Spotify.search(term).then(songs => {
      this.setState({searchResults : songs});
    })
  }
  saveSpotify = (name) => {
    let tracks = this.state.playlistSongs
    Spotify.savePlaylist(name, tracks);
  }
  componentWillMount() {
    Spotify.getAccessToken();
    Spotify.getUserID();
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults action={this.addToPlaylist} songs={this.state.searchResults} />
            <Playlist action={this.removeFromPlaylist} songs={this.state.playlistSongs} name={this.state.playlistName} saveSpotify={this.saveSpotify} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
