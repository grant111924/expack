import logMessage from './js/logger'
import './css/style.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import $ from 'jquery';
import '../node_modules/bootstrap4-toggle/css/bootstrap4-toggle.min.css'
import '../node_modules/bootstrap4-toggle/js/bootstrap4-toggle.min.js'
// Log message to console
logMessage('about page!!')
const serverAddr ='http://localhost:8080/'
const selectElement = document.querySelector('#deviceList');
//TODO switch
$('#switch').change(function() {
   console.log($(this).prop('checked'));
})
//TODO select
selectElement.addEventListener('change', (event) => {
  axios.post(serverAddr+'event',{
    type: event.target.value
  }).then(res => {
    let data = res.data.event
    document.getElementById("eventTable").innerHTML=''
    data.map((item,index) =>{
      document.getElementById("eventTable").innerHTML+=`
        <tr>
          <th scope="row">${index}</th>
          <td>${item.timestamp}</td>
          <td>${Number(item.timesLength)*5} sec</td>
        </tr>
      `
    })
  }).catch(err => {
    console.log(err);
  });
}); 

//TODO info table
axios.get(serverAddr+'data')
.then(res =>{
    let data =res.data
    document.getElementById("infoTable").innerHTML = ''
    data.map((item) =>{
      document.getElementById("infoTable").innerHTML+=`
        <tr>
          <th scope="row">${item.type}</th>
          <td>${item.timesPerDay}</td>
          <td>${item.timesTotal}</td>
          <td>${item.timesAvgLength}</td>
        </tr>
      `
      document.getElementById("deviceList").innerHTML+=`
          <option>${item.type}</option>
      `
    })
}).catch(err => {
    console.log(err);
})


if (module.hot)       // eslint-disable-line no-undef
  module.hot.accept() // eslint-disable-line no-undef