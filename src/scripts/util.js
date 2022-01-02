import {Fetch} from './fetch.js';
let fetch = new Fetch();
export class Util {



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
    this.clearTable();
    sessionStorage.setItem('tableData', JSON.stringify(values));
    const table = document.querySelector('#table-content')
    for (let i = 0; i < values.length; i++) {
      const tr = document.createElement('tr')
      Object.keys(values[i]).forEach((key) => {
        if (key !== 'artistId') {
          const th = document.createElement('th')
          th.classList.add('artist-table-info')
          th.append(values[i][key]) 
          tr.append(th)
        } else {
          const th = document.createElement('th')
          th.classList.add('hide-artist-id')
          th.append(values[i][key]) 
          tr.append(th)
        }
      })
      table.append(tr)
    }
  }

  //event listener that takes advantage of bubbling property to add one event listner to every row
  getTableInfo(){
    let table = document.querySelector('#table-content');
    table.addEventListener('click', (e) => {
      if (!e.target.classList.contains('middle-titles') && !e.target.classList.contains('fa-sort')) {
        const tr = e.target.parentElement;
        if (!tr.id) {
          console.log(tr)
          console.log(tr.lastChild.innerText)
          console.log(typeof tr.lastChild.innerText)
          fetch.getArtist(tr.lastChild.innerText)
        }
      }
    })
  }

  clearTable() {
    const deleteColumns = document.querySelectorAll('#table-content > tr')
    deleteColumns.forEach((col) => {
      col.remove()
    })
  }

  // clearToggle() {
  //   const sorts = document.querySelectorAll('.middle-titles > i')
  //   sorts.forEach((icon) => {
  //     icon.classList.remove('active-sort')
  //   })
  // }

  toggleSort() {
    const sorts = document.querySelectorAll('.middle-titles > i')
    sorts.forEach((icon) => {
      icon.addEventListener('click', () => {
        icon.classList.toggle('active-sort')
        if (icon.classList.contains('active-sort')) {
          this.sortTable(icon.dataset.value,true)
        } else {
          this.sortTable(icon.dataset.value,false)
        }
      })
    })
  }
  
  sortTable(column,status) {
    //status would be a toggled class saying if its sorted or
    let table = JSON.parse(sessionStorage.getItem('tableData'))
    console.log(table)
    let sorted = table.sort((a,b) => { 
      let colA = a[column].toUpperCase();
      let colB = b[column].toUpperCase();
      if (!status) {
        return colB < colA ? -1 : colB > colA ? 1 : 0
      } else {
        return colA < colB ? -1 : colA > colB ? 1 : 0
      }
    })
    this.makeTable(sorted)
  }


}
