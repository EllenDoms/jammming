import React from 'react';
import './Playlist.css';
import SongList from '../SongList/SongList';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: 'New playlist'};

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if(this.props.name) {
      this.setState({
       name: this.props.name
      });
    }
  }
  handleChange(event) {
    this.setState({name: event.target.value});
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.state.name} onChange={this.handleChange} />
        <SongList songs= {this.props.songs} playlist='play' isRemoval='-' action={this.props.action} />
        <a className="Playlist-save" onClick={event => this.props.saveSpotify(this.state.name)} >SAVE TO SPOTIFY</a>
      </div>
    )
  }
}
