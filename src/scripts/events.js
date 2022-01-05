import {Fetch} from './fetch.js';
import {Util} from './util.js';
let fetch = new Fetch();
let util = new Util();

export class Event{
  // left sidebar toggles active states to either stay open or closed
  collapseLeftBar() {
    document.querySelectorAll('.collapsible').forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('active');
        this.resetCollapseLeftSide();
      })
    })
  };

  resetCollapseLeftSide(){
    let collapseContainer = document.querySelector('.left-container')
    if (collapseContainer.classList.contains('left-container-collapse')) {
      collapseContainer.classList.remove('left-container-collapse')
    }
  }

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
      e.stopPropagation();
      //value is a string
      let tableValues = await fetch.getTrackFromSubmit(input.value)
      util.makeTable(tableValues)
      input.value = ''
    })
  }

  addBoxShadow(){
    document.querySelector('#artist-info-container')
      .style.boxShadow = '0 4px 6px 0 hsla(0,0%,0%,0.2)'
  }

  toggleSort() {
    const sorts = document.querySelectorAll('.middle-titles > i')
    sorts.forEach((icon) => {
      icon.addEventListener('click', () => {
        icon.classList.toggle('active-sort')
        if (icon.classList.contains('active-sort')) {
          util.sortTable(icon.dataset.value,true)
        } else {
          util.sortTable(icon.dataset.value,false)
        }
      })
    })
  }

  //event listener that takes advantage of bubbling property to add one event listner to every row
  getTableInfo(){
    let table = document.querySelector('#table-content');
    table.addEventListener('click', (e) => {
      this.addBoxShadow();
      if (e.target.classList.contains('fa-trash') && e.target.classList.contains('remove')) {
        let deleted = e.target.parentElement.parentElement
        util.updateSessionStorage(deleted);
        deleted.remove()
      } else if (!e.target.classList.contains('middle-titles') && !e.target.classList.contains('fa-sort')) {
        const tr = e.target.parentElement;
        this.updateRightWidth();
        document.querySelector('#middle-container').style.width = '55%'

        // this.updateMiddleWidthFromRight();
        // id is the table id
        if (!tr.id) {
          const artist = tr.querySelector('.artist').innerText;
          const title = tr.querySelector('.title').innerText;
          const artistId = tr.querySelector('.hide-artist-id').innerText;
          util.fillArtistInfo(artistId,artist,title)
          util.addLyrics(artist,title)
        }
      }
    })
  }
  checkLeftCollapse(){
    let left = document.querySelector('.left-container')
    left.addEventListener(('click'), (e) => {
      let rightDiv = document.querySelector('#artist-info-container')
      if (left.classList.contains('left-container-collapse') && 
            rightDiv.innerText.length !== 0) {
        rightDiv.style.width = '42%'
      } else if  (left.classList.contains('left-container-collapse') && 
          rightDiv.innerText.length === 0){
        rightDiv.style.width = '0%';
      } else if (!left.classList.contains('left-container-collapse') && 
      rightDiv.innerText.length === 0){
        // document.querySelector('#middle-container').style.width = '98%'
        rightDiv.style.width = '0%';
      } else {
        rightDiv.style.width = '28%'
      }
    })
  }

  updateRightWidth(){
    let rightDiv = document.querySelector('#artist-info-container')
    let left = document.querySelector('.left-container')
    if (left.classList.contains('left-container-collapse')) {
      rightDiv.style.width = '42%'
    } else  {
        rightDiv.style.width = '28%'
      }
  }


  startAllEvents(){
    this.collapseLeftBar()
    this.submitSong();
    this.toggleSort();
    this.getTableInfo();
    this.collapseLeftSide();
    this.checkLeftCollapse();
  }

}