import React from 'react';
import './SearchResults.css';
import SongList from '../SongList/SongList';

export default class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <SongList songs= {this.props.songs} playlist='no' isRemoval='+' action={this.props.action} />
      </div>
    )
  }
}
