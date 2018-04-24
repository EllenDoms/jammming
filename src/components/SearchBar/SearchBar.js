import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {song: ''};
  }
  render() {
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" value={this.state.song} onChange={event => this.setState({song:event.target.value})} />
        <a className="SearchBar-submit" onClick={event => this.props.searchSpotify(this.state.song)}>Search</a>
      </div>
    )
  }
};
