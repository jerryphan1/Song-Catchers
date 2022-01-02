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
      tr.classList.add('clickable-tr')
      Object.keys(values[i]).forEach((key) => {
        if (key !== 'artistId') {
          const th = document.createElement('th')
          key === 'title' ? th.classList.add('title') : key === 'artist' ? th.classList.add('artist') : th.classList.add('date')
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
    table.addEventListener('click', async (e) => {
      if (!e.target.classList.contains('middle-titles') && !e.target.classList.contains('fa-sort')) {
        const tr = e.target.parentElement;
        if (!tr.id) {
          let artistInfo = await fetch.getArtist(tr.lastChild.innerText)
          this.addArtistInfoTop(artistInfo)
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

  clearArtistInfoTop(){
    const outerDiv = document.querySelector('#artist-info-top');
    while (outerDiv.firstChild) {
      outerDiv.removeChild(outerDiv.lastChild);
    }
  }

  addArtistInfoTop(information){
    // console.log(information)
    this.clearArtistInfoTop()
    const outerDiv = document.querySelector('#artist-info-top');
    const img = document.createElement('img');
    img.classList.add('artist-pic');
    img.src = information.image; 
    const div = document.createElement('div')
    for (let i = 0; i < 2; i++) {
      const p = document.createElement('p')
      p.classList.add('artist-basics')
      if (i === 0) {
        let a = document.createElement('a')
        a.href = information.uri
        a.innerText = `${information.name}`
        p.innerText ='Artist: '
        p.append(a)
      } else {
        p.innerText = `Followers: ${information.followers.toLocaleString('en-US')}`
      }
      div.append(p)
    }
    outerDiv.append(img,div)
  }
}
