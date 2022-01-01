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
    console.log(token)
    let result = ""
    let inputSplit = input.split(' ')
    inputSplit.forEach((word,index) => {
      result += word
      if (index !== inputSplit.length - 1) result += '%20'
    }) 
    fetch(`https://api.spotify.com/v1/search?q=${result}&type=track&market=ES&limit=10`, {
      headers: {
        'Authorization': token.token_type + ' ' + token.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(resp) {
      return resp.json();
    }).then(function(data) {
      // track to table
      let outer = []
      for (let i = 0; i < data['tracks']['items'].length; i++) {
        let inner = []
        inner.push(data['tracks']['items'][i]['artists'][0]['name'])
        inner.push(data['tracks']['items'][i]['name'])
        inner.push(data['tracks']['items'][i]['album']['release_date'])
        outer.push(inner)

        // console.log(data['tracks']['items'][i]['artists'][0]['name']) //artist
        // console.log(data['tracks']['items'][i]['name']) //song
        // console.log(data['tracks']['items'][i]['album']['release_date']) //release date
      }
      console.log(outer)
    }).catch(function(err) {
      console.log('something went wrong',err)
    })
  }
}