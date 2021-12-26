window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM');
});

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.collapsible').forEach((button) => {
    button.addEventListener('click', () => {
      // let content = button.nextElementSibling;
      button.classList.toggle('active')
      // console.log(content.style.maxHeight)
      // if (!content.style.maxHeight){
      //   content.style.maxHeight = content.scrollHeight + "px";
      // } else {
      //   content.style.maxHeight = 0;
      // } 
    })
  })
});




