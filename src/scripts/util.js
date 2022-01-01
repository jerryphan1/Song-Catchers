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
    this.clearTable()
    const table = document.querySelector('#table-content')
    for (let i = 0; i < values.length; i++) {
      const tr = document.createElement('tr')
      Object.keys(values[i]).forEach((key) => {
        const th = document.createElement('th')
        th.classList.add('test')
        th.append(values[i][key]) 
        tr.append(th)
      })
      table.append(tr)
    }
  }

  clearTable() {
    const deleteColumns = document.querySelectorAll('#table-content > tr')
    deleteColumns.forEach((col) => {
      col.remove()
    })
  }


  // let test = [
  //   {artist: 'Michelle Branch', title:  'All You Wanted', date :'2001-07-31'},
  //   {artist: 'Michelle Branch', title:  'Everywhere', date :'2002-07-31'},
  //   {artist: 'Michelle Branch', title:  'Breathe', date :'2003-07-31'}
  
  // ]
  
  // sortTable(table,column,status) {
  //   //status would be a toggled class saying if its sorted or
  //   return table.sort((a,b) => { 
  //     let colA = a[column].toUpperCase();
  //     let colB = b[column].toUpperCase();
  //     if (status) {
  //       return colB < colA ? -1 : colB > colA ? 1 : 0
  //     } else {
  //       return colA < colB ? -1 : colA > colB ? 1 : 0
  //     }
  //   })
  // }
}
