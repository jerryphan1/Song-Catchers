import {Fetch} from './scripts/fetch.js';
import {Util} from './scripts/util.js';
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM');
  let util = new Util();
  let fetch = new Fetch();
  util.makeGraph()
  util.collapseLeftBar()
  util.submitSong();
  // fetch.getToken()
  // fetch.getTrack()
});


// fetch("https://api.spotify.com/v1/search?q=blank%20space%2C%20taylor%20swift&type=track%2Cartist&market=ES&limit=1&offset=0", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "Spotifystefan-skliarovV1.p.rapidapi.com",
// 		"x-rapidapi-key": "d598ec9ba6mshf7887ac605b454ep194a45jsn6d5e682eeb9c"
// 	}
//   })
//   .then(response => {
//     return response.json();
//   })
//   .then(data => console.log(data))
//   .catch(err => console.log(err))



// var Buffer = require('buffer');
// console.log(Buffer)

// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// request.post(authOptions, function(error, response, body) {
//   console.log('test')
//   if (!error && response.statusCode === 200) {
//     var token = body.access_token;
//   }
// });



// window.addEventListener('DOMContentLoaded', (event) => {
// const APIController = (function() {
//   console.log('testi')
//   const clientId = '661979470da84b9ead5db04fcede6ada';
//   const clientSecret = '9a759d370dc34783b8e30e0375999dca';

//   const _getToken = async () => {

//     const result = await fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type' : 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
//       },
//       body:  'grant_type=client_credentials'
//     });

//     const data = await result.json();
//     console.log('hi')
//     console.log(data.access_token)
//     return data.access_token;
//   }

//   const _getSearch = async (token) => {

//     const result = await fetch("https://api.spotify.com/v1/search?q=last%20cup%20of%20coffee%2C%20valkyrae&type=track%2Cartist&market=ES&limit=1&offset=0", {
//       method: 'GET',
//       headers: { 'Authorization' : 'Bearer ' + token}
//     });

//     const data = await result.json();
//     // return data.artists.items;
//     console.log(data)
//   }

//   return {
//     getToken() {
//       return _getToken();
//     },

//     getSearch() {
//       return _getSearch(token)
//     }
//   }

// })()
// });