window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM');
});

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.collapsible').forEach((button) => {
    button.addEventListener('click', () => {
      // let content = button.nextElementSibling;
      button.classList.toggle('active')
      // console.log(content.style.maxHeight)
      // if (!content.style.maxHeight){
      //   content.style.maxHeight = content.scrollHeight + "px";
      // } else {
      //   content.style.maxHeight = 0;
      // } 
    })
  })
});


window.addEventListener('DOMContentLoaded', (event) => {
  const ctx = document.getElementById('myChart').getContext('2d')
  const labels = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
  ];

  const testData = {
    labels,
    datasets: [
      {
        data: [200,211,212,213,214,215],
        backgroundColor: 'rgb(255, 10, 11)',
        label: 'Test Graph'
      }
    ]
  }

  const config = {
    type: 'line',
    data: testData,
    options: {
      responsive: true,
    },
  }

  const myChart = new Chart(ctx,config)
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


const APIController = (function() {

  const clientId = '';
  const clientSecret = '';

  const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
      },
      body:  'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
  }

  const _getSearch = async (token) => {

    const result = await fetch("https://api.spotify.com/v1/search?q=last%20cup%20of%20coffee%2C%20valkyrae&type=track%2Cartist&market=ES&limit=1&offset=0", {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    // return data.artists.items;
    return data;
  }

  return {
    getToken() {
      return _getToken();
    },

    getSearch() {
      return _getSearch(token)
    }
  }

})();