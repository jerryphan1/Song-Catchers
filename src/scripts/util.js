import {Fetch} from './fetch.js';
let fetch = new Fetch();
export class Util {
  makeGraph() {
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
  }

  collapseLeftBar() {
    document.querySelectorAll('.collapsible').forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('active')
      })
    })
  };

  submitSong() {
    let input = document.querySelector('.search-bar-input')
    let searchBar = document.querySelector('.search-bar')

    searchBar.addEventListener('submit', async (e) => {
      e.preventDefault();
      //value is a string
      let tableValues = await fetch.getTrack(input.value)
      this.makeTable(tableValues)
      input.value = ''
    })
  }

  makeTable(values){
    console.log('inside')
    console.log(values)
  }
}