import {Fetch} from './fetch.js';
let fetch = new Fetch();
export class Util {

  collapseLeftBar() {
    document.querySelectorAll('.collapsible').forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('active');
        this.resetCollapseLeftSide();
      })
    })
  };

  collapseLeftSide(){
    let collapse = document.querySelector('.collapse-left')
    collapse.addEventListener('click', () => {
      let collapseContainer = document.querySelector('.left-container')
      collapseContainer.classList.toggle('left-container-collapse')

      if (collapseContainer.classList.contains('left-container-collapse')) {
        this.resetActiveState();
      }
    })
  }

  resetCollapseLeftSide(){
    let collapseContainer = document.querySelector('.left-container')
    if (collapseContainer.classList.contains('left-container-collapse')) {
      collapseContainer.classList.remove('left-container-collapse')
    }
  }

  resetActiveState(){
    document.querySelectorAll('.collapsible').forEach((button) => {
      button.classList.remove('active')
    })
  }

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
          let thDel = this.createDelete()
          const thID = document.createElement('th')
          thID.classList.add('hide-artist-id')
          thID.append(values[i][key]) 
          tr.append(thDel,thID)
        }
      })
      table.append(tr)
    }
  }

  createDelete(){
    const icon = document.createElement("i");
    icon.classList.add('fas','fa-trash','remove');
    const thDel = document.createElement('th')
    thDel.classList.add('delete', 'artist-table-info');
    thDel.append(icon)
    return thDel;
  }


  //event listener that takes advantage of bubbling property to add one event listner to every row
  getTableInfo(){
    let table = document.querySelector('#table-content');
    table.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-trash') && e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove()
        console.log(sessionStorage.getItem('tableData'))
      } else if (!e.target.classList.contains('middle-titles') && !e.target.classList.contains('fa-sort')) {
        const tr = e.target.parentElement;
        // id is the table id
        if (!tr.id) {
          const artist = tr.querySelector('.artist').innerText;
          const title = tr.querySelector('.title').innerText;
          const artistId = tr.querySelector('.hide-artist-id').innerText;
          this.fillArtistInfo(artistId)
          this.addLyrics(artist,title)
        }
      }
    })
  }

  async fillArtistInfo(input){
    let artistInfo = await fetch.getArtist(input)
    let artistTracks = await fetch.getArtistTracks(input)
    let relatedArtists = await fetch.getRelatedArtists(input)
    this.clearArtistInfoTop();
    this.clearArtistInfoBottom();
    this.addArtistInfo(artistInfo);
    this.addArtistTracks(artistTracks);
    this.addRelatedArtists(relatedArtists)
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

  addArtistInfo(information){
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

  addArtistTracks(information) {
    const artistInfo = document.querySelector('#artist-info-bottom');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.innerText = 'Popular Songs';
    const ul = document.createElement('ul')
    ul.classList.add('top-songs')
    for (let i = 0; i < information.length; i++){
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = information[i].preview;
      a.innerText = `${information[i].name}`;
      li.append(a)
      ul.append(li)
    }
    div.append(h2,ul)
    artistInfo.append(div)
  }

  addRelatedArtists(information) {
    const artistInfo = document.querySelector('#artist-info-bottom');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.innerText = 'Similar Artists';
    const ul = document.createElement('ul')
    ul.classList.add('common-artists')
    for (let i = 0; i < information.length; i++){
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = information[i].uri;
      a.innerText = `${information[i].artist}`;
      li.append(a)
      ul.append(li)
    }
    div.append(h2,ul)
    artistInfo.append(div)
  }

  clearArtistInfoBottom(){
    const outerDiv = document.querySelector('#artist-info-bottom');
    while (outerDiv.firstChild) {
      outerDiv.removeChild(outerDiv.lastChild);
    }
  }

  async addLyrics(artist,title){
    this.clearLyrics()
    let lyrics = await fetch.getSongLyrics(artist,title)
    let lyricContainer = document.querySelector('#song-lyrics')
    if (typeof lyrics === 'undefined') {
      console.log('failed')
      console.log(lyrics)
    } else {
      console.log(lyrics)
      let titleP = document.createElement('p')
      let lyricsP = document.createElement('p')
      titleP.innerText = lyrics[0].title;
      console.log(lyrics[0].lyrics.lyrics)
      if (!lyrics[0].lyrics.lyrics) {
        lyricsP.innerText = `lyrics for ${title} not available...`;
      } else {
        //Paroles de la chanson Nightlight par Illenium
        let startSlice = lyrics[0].lyrics.lyrics.indexOf(`\n`) 
        let sliceLyrics = lyrics[0].lyrics.lyrics.slice(startSlice);
        lyricsP.innerText = sliceLyrics;
      }
      lyricContainer.append(titleP,lyricsP)
    }
  }

  clearLyrics(){
    let lyricContainer = document.querySelector('#song-lyrics')
    while (lyricContainer.firstChild) {
      lyricContainer.removeChild(lyricContainer.lastChild)
    }
  }

}

