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
      let testRun = this.filterArr(tableValues)
      util.makeTable(testRun.slice(0,10))
      input.value = ''
    })
  }

  filterArr(arr) {
    let newArr = [];
    for (let i =0; i<arr.length; i++){
      if (i===0) newArr.push(arr[i])
      if (!this.isDupe(newArr,arr[i])) newArr.push(arr[i])
    }
    return newArr
  }
  
  isDupe(newArr,ele) {
    for (let i = 0; i < newArr.length; i++) {
      let title = newArr[i].title.toUpperCase()
      let artist = newArr[i].artist.toUpperCase()
      let id = newArr[i].artistId.toUpperCase()
      if (title === ele.title.toUpperCase() 
              && artist === ele.artist.toUpperCase() 
              && id === ele.artistId.toUpperCase()) {
        return true
      }
    }
    return false
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

  aboutModal(){
    const aboutModal = document.getElementById("myAboutModal");
    const instructModal = document.getElementById("myInstructModal");
    // Get the button that opens the modal
    const AboutBtn = document.getElementById("BtnAbout");
    const instructBtn = document.getElementById("BtnInstruct");

    // Get the <span> element that closes the modal
    const aboutSpan = document.getElementsByClassName("about-close")[0];
    const instructSpan = document.getElementsByClassName("instruct-close")[0];

    // When the user clicks on the button, open the modal
    // btn.onclick = function() {
    //   modal.style.display = "block";
    // }

    AboutBtn.addEventListener(('click'), () => {
      aboutModal.style.display = "block";
    })

    aboutSpan.addEventListener(('click'), () => {
      aboutModal.style.display = "none";
    })


    instructBtn.addEventListener(('click'), () => {
      instructModal.style.display = "block";
    })

    instructSpan.addEventListener(('click'), () => {
      instructModal.style.display = "none";
    })

    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //   modal.style.display = "none";
    // }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == aboutModal) {
        aboutModal.style.display = "none";
      } else if (event.target == instructModal) {
        instructModal.style.display = "none";
      }
    }
  }

  startAllEvents(){
    this.collapseLeftBar()
    this.submitSong();
    this.toggleSort();
    this.getTableInfo();
    this.collapseLeftSide();
    this.checkLeftCollapse();
    this.aboutModal();
  }

}