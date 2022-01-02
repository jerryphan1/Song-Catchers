import {Fetch} from './scripts/fetch.js';
import {Util} from './scripts/util.js';
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM');
  let util = new Util();
  let fetch = new Fetch();
  util.makeGraph()
  util.collapseLeftBar()
  util.submitSong();
  util.toggleSort();
});
