

export class Fetch {
  getToken() {
    let client_id = '661979470da84b9ead5db04fcede6ada';
    let client_secret = '9a759d370dc34783b8e30e0375999dca';

    return fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body:  'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + 
        client_secret,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(resp) {
      return resp.json();
    }).then(function (data) {
      return data
    }).catch(function(err) {
      console.log('something went wrong', err)
    });
  }

  async getTrackFromSubmit(input) {
    let token = await this.getToken();
    let result = encodeURIComponent(input) //special character parser thingy
    return fetch(`https://api.spotify.com/v1/search?q=${result}&type=track&market=ES&limit=20`, {
      headers: {
        'Authorization': token.token_type + ' ' + token.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(resp) {
      return resp.json();
    }).then(function(data) {
      const outer = []
      for (let i = 0; i < data['tracks']['items'].length; i++) {
        const inner = {
          title: data['tracks']['items'][i]['name'],                //title
          artist: data['tracks']['items'][i]['artists'][0]['name'], //artist
          releaseDate: data['tracks']['items'][i]['album']['release_date'], //release date
          artistId: data['tracks']['items'][i]['artists'][0]['id'] //artist id
        }
        outer.push(inner)
      }
      return outer;
    }).catch(function(err) {
      console.log('something went wrong',err)
    })
  }

  // want to get artist image, total followers, name
  async getArtist(input) {
    let token = await this.getToken();
    return fetch(`https://api.spotify.com/v1/artists/${input}`, {
      headers: {
        'Authorization': token.token_type + ' ' + token.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(resp) {
      return resp.json();
    }).then(function(data) {
      console.log(data)
      const artistInfo = {
        name: data['name'],
        followers: data['followers']['total'],
        uri: data['uri']
      }
      if (data['images'].length === 0) {
        artistInfo.image = './easter-egg.jpg'
      } else {
        artistInfo.image = data['images'][data.images.length -1]['url']
      }
      return artistInfo;
    }).catch(function(err) {
      console.log('something went wrong', err)
    })
  }

  async getArtistTracks(input){
    let token = await this.getToken();
    return fetch(`https://api.spotify.com/v1/artists/${input}/top-tracks?market=ES`, {
      headers: {
        'Authorization': token.token_type + ' ' + token.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(resp) {
      return resp.json();
    }).then(function(data) {
      let songsArr = [];
      for (let i = 0; i < data['tracks'].length; i++) {
        const inner = {
          name: data['tracks'][i]['name'],
          preview: data['tracks'][i]['uri']
        }
        songsArr.push(inner)
      }
      return songsArr;
    }).catch(function(err) {
      console.log('something went wrong', err)
    })
  }

  async getRelatedArtists(input) {
    let token = await this.getToken();
    return fetch(`https://api.spotify.com/v1/artists/${input}/related-artists`, {
      headers: {
        'Authorization': token.token_type + ' ' + token.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(resp) {
      return resp.json();
    }).then(function(data) {
      const artistsArr = [];
      for (let i = 0; i < data['artists'].length / 2; i++) {
        const inner = {
          artist: data['artists'][i]['name'],
          uri: data['artists'][i]['uri']
        }
        artistsArr.push(inner)
      }
      return artistsArr;
    }).catch(function(err) {
      console.log('something went wrong', err)
    })
  }

  getSongLyrics(artist,title){
    let artistInput = encodeURIComponent(artist)
    let titleInput = encodeURIComponent(title)
    return fetch(`https://api.lyrics.ovh/v1/${artistInput}/${titleInput}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then( (resp) => resp.json()) 
      .then( (data) =>  {
        const lyricsArr = []
        const inner = {
          title: title,
          lyrics: data
        }
        lyricsArr.push(inner);
        return lyricsArr;
      })
      .catch(function(err) {
        console.log('bad',err)
        return [{title: title}]
    })
  }

}



// let test = [
//   {title: 'Blank Space', artist: 'Taylor Swift', releaseDate: '2014-01-01', artistId: '06HL4z0CvFAxyc27GXpf02'},
//   {title: 'Blank Space/Stand By Me - Live From Spotify London', artist: 'Imagine Dragons', releaseDate: '2015-04-20', artistId: '53XhwfbYqKCa1cC15pYq2q'},
//   {title: 'Blank Space / Jealous (Acoustic Mashup)', artist: 'Megan Davies', releaseDate: '2021-02-05', artistId: '09kCHZp9iFO2FJNb9lR6G5'},
//   {title: 'Blank Space', artist: 'Taylor Swift', releaseDate: '2014-01-01', artistId: '06HL4z0CvFAxyc27GXpf02'},
//   {title: 'Blank Space', artist: 'Ryan Adams', releaseDate: '2015-09-21', artistId: '2qc41rNTtdLK0tV3mJn2Pm'},
//   {title: 'Blank Space', artist: 'I Prevail', releaseDate: '2014-12-16', artistId: '3Uobr6LgQpBbk6k4QGAb3V'},
//   {title: 'Blank Space - Acoustic', artist: 'Tyler Ward', releaseDate: '2015-04-13', artistId: '5Hc9oDGvStNGmnj44m8sHg'},
//   {title: 'Blank Space', artist: 'Brooklyn Duo', releaseDate: '2014-11-27', artistId: '6wBOZ9D65AcqUlfKUqsQ7R'},
//   {title: 'Blank Space', artist: 'Wasback', releaseDate: '2021-08-06', artistId: '3rmYE7edorDWoKVPGk9iLZ'},
//   {title: 'Blank Space', artist: 'RHODES', releaseDate: '2015-09-18', artistId: '07FfkbljNIdl45Ijlh1aXS'}
// ]



