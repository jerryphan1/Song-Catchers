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

  async getTrack(input) {
    let token = await this.getToken();
    let result = encodeURIComponent(input) //special character parser thingy
    return fetch(`https://api.spotify.com/v1/search?q=${result}&type=track&market=ES&limit=10`, {
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
    // let id = input.artistId
    return fetch(`https://api.spotify.com/v1/artists/${input}`, {
      headers: {
        'Authorization': token.token_type + ' ' + token.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(resp) {
      return resp.json();
    }).then(function(data) {
      const artistInfo = {
        name: data['name'],
        followers: data['followers']['total'],
        image: data['images'][data.images.length -1]['url']
      }
      return artistInfo;
    }).catch(function(err) {
      console.log('something went wrong', err)
    })
  }

}

