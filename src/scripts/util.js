import {Fetch} from './fetch.js';
let fetch = new Fetch();
export class Util {
  
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

  clearTable() {
    const deleteColumns = document.querySelectorAll('#table-content > tr')
    deleteColumns.forEach((col) => {
      col.remove()
    })
  }


  //adds delete icon 
  createDelete(){
    const icon = document.createElement("i");
    icon.classList.add('fas','fa-trash','remove');
    const thDel = document.createElement('th')
    thDel.classList.add('delete', 'artist-table-info');
    thDel.append(icon)
    return thDel;
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

  updateSessionStorage(data){
    const artist = data.querySelector('.artist').innerText;
    const title = data.querySelector('.title').innerText;
    const artistId = data.querySelector('.hide-artist-id').innerText;
    let keys = JSON.parse(sessionStorage.getItem('tableData'))
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].title === title && keys[i].artist == artist && keys[i].artistId == artistId) {
        keys.splice(i,1)
        return sessionStorage.setItem('tableData', JSON.stringify(keys));
      }
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
        p.append(a)
      } else {
        p.classList.add('artist-basic-followers')
        let span = document.createElement('span')
        span.innerText = `${information.followers.toLocaleString('en-US')}`
        p.innerText = `Followers: `
        p.append(span)
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
    const ol = document.createElement('ol')
    ol.classList.add('top-songs')
    for (let i = 0; i < information.length; i++){
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = information[i].preview;
      a.innerText = `${information[i].name}`;
      li.append(a)
      ol.append(li)
    }
    div.append(h2,ol)
    artistInfo.append(div)
  }

  addRelatedArtists(information) {
    const artistInfo = document.querySelector('#artist-info-bottom');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.classList.add('artist-h2');
    h2.innerText = 'Similar Artists';
    const ol = document.createElement('ol')
    ol.classList.add('common-artists')
    for (let i = 0; i < information.length; i++){
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = information[i].uri;
      a.innerText = `${information[i].artist}`;
      li.append(a)
      ol.append(li)
    }
    div.append(h2,ol)
    artistInfo.append(div)
  }

  async addLyrics(artist,title){
    this.clearLyrics()
    let lyrics = await fetch.getSongLyrics(artist,title)
    console.log(lyrics)
    let lyricContainer = document.querySelector('#song-lyrics')
    let titleP = document.createElement('p')
    let lyricsP = document.createElement('p')
    titleP.innerText = lyrics[0].title;
    if (typeof lyrics[0].lyrics === 'undefined'){
      lyricsP.innerText = `lyrics for ${title} not available...`;
    }else if (!lyrics[0].lyrics.lyrics) {
      lyricsP.innerText = `lyrics for ${title} not available...`;
    } else {
      //Paroles de la chanson Nightlight par Illenium
      let startSlice = lyrics[0].lyrics.lyrics.indexOf(`\n`) 
      let sliceLyrics = lyrics[0].lyrics.lyrics.slice(startSlice);
      startSlice === -1 ? lyricsP.innerText = lyrics[0].lyrics.lyrics : lyricsP.innerText = sliceLyrics
    }
    lyricContainer.append(titleP,lyricsP)
  }

  clearArtistInfoBottom(){
    const outerDiv = document.querySelector('#artist-info-bottom');
    while (outerDiv.firstChild) {
      outerDiv.removeChild(outerDiv.lastChild);
    }
  }

  clearArtistInfoTop(){
    const outerDiv = document.querySelector('#artist-info-top');
    while (outerDiv.firstChild) {
      outerDiv.removeChild(outerDiv.lastChild);
    }
  }

  clearLyrics(){
    let lyricContainer = document.querySelector('#song-lyrics')
    while (lyricContainer.firstChild) {
      lyricContainer.removeChild(lyricContainer.lastChild)
    }
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

}

