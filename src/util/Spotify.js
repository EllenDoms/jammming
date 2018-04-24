const clientID = '2cb3897b37c441bf99d8b254e163757c';
const redirect_uri = 'https://ellendoms.com/projects/jammming/'; // http://localhost:3000/
const scopes = 'user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public';
let accessToken = getParameterByName('access_token');
let expiration = getParameterByName('expires_in');
let userID = '';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[#&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const Spotify = {
  startAuthorization() {
    console.log('authorization');
    let url =
      'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + clientID +
      '&scope=' + encodeURIComponent(scopes) +
      '&redirect_uri=' + encodeURIComponent(redirect_uri);
      window.location = url;
  },
  getAccessToken() {
    // token ok, expiration ok
    if (accessToken && expiration) {
      console.log('token ok');
    // if no token set
    } else if (accessToken == null) {
      console.log('no token');
      window.location = 'https://accounts.spotify.com/authorize?client_id=' + clientID + '&response_type=token&scope=playlist-modify-private&redirect_uri=' + redirect_uri;
      this.startAuthorization();
    //if token expired
    } else if(expiration == 0) {
      console.log('expired')
      accessToken == null;
      window.setTimeout(() => accessToken = '', expiration * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {

    }
  },
  getUserID() {
    let url = 'https://api.spotify.com/v1/me';
    return fetch (url, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    .then(response => response.json())
    .then (jsonResponse => {
      console.log(jsonResponse.id);
      userID = jsonResponse.id;
    })
  },
  search(term) {
    let url = `https://api.spotify.com/v1/search?type=track&q=${term}`
    return fetch (url, {
      headers: { Authorization: `Bearer ${accessToken}`}
    })
    .then(response => response.json())
    //retrieve list of songs
    .then(jsonResponse => {
      // check if jsonResponse has songs
      if(jsonResponse.tracks) {
        //Go through all songs
        return jsonResponse.tracks.items.map(track => {
          return ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            URI: track.uri
          });
        })
      } else {
        console.log('no tracks');
      }
    });
  },
  savePlaylist(name, tracks) {
    console.log(userID);
    let url = `https://api.spotify.com/v1/users/${userID}/playlists`
    console.log(url);
    fetch( url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "description": "Playlist from Jammming",
        "public": false
      })
    })
    .then(response => response.json())
    .then(jsonResponse => {
      let playlistID = jsonResponse.id;
      console.log(playlistID);
      console.log(tracks[0].URI);
      tracks.forEach(track => {
        let url2 = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks?uris=${track.URI}`
        fetch( url2, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": "application/json"
          }
        })
      })

    })
  }
};
export default Spotify;
