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
  };
}