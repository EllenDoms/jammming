import React from 'react';
import './Song.css';

export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isRemoval: ''};
  }
  componentDidMount() {
    this.props.isRemoval === '-' ? this.setState({isRemoval : '-'}) : this.setState({isRemoval : '+'})
}
  render() {
    return(
        <div className="Song">
          <div className="Song-information">
            <h3>{this.props.song.name}</h3>
            <p>{this.props.song.artist} | {this.props.song.album}</p>
          </div>
          <a className="Song-action" onClick={() => {this.props.action(this.props.songId, this.props.song)}}>{this.state.isRemoval}</a>
        </div>
    )};
};
