import React from 'react';
import './SongList.css';
import Song from '../Song/Song';

export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isRemoval: this.props.isRemoval}
  }
  render() {
    return(
      <div className="SongList">
        {this.props.songs.map((song, id) => {
          return <Song isRemoval={this.state.isRemoval} key={this.props.playlist + id} song={song} songId={id} action={this.props.action}  />;
        })}
      </div>
    )
  }
}
