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
      console.log('token', data);
      return data
    }).catch(function(err) {
      console.log('something went wrong', err)
    });
  }

  getSong() {
    let token = this.getToken();
    fetch('https://api.spotify.com/v1/search?q=valkyrae&type=artist&market=ES&limit=1', {
      headers: {
        'Authorization': token.token_type + ' ' + token.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(resp) {
      return resp.json();
    }).then(function(data) {
      console.log('song',data)
    }).catch(function(err) {
      console.log('something went wrong',err)
    })
  }
}