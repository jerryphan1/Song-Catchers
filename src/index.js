import {Fetch} from './scripts/fetch.js';
import {Util} from './scripts/util.js';
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM');
  let util = new Util();
  let fetch = new Fetch();
  // fetch.getSongLyrics();
  util.collapseLeftBar()
  util.submitSong();
  util.toggleSort();
  util.getTableInfo();
  util.collapseLeftSide();
});
