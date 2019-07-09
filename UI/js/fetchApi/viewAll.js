const getAll = () => {    
    const token = JSON.parse(localStorage.getItem('authToken'));
fetch("https://cors-anywhere.herokuapp.com/" + 
 "http://automart-webapp.herokuapp.com/api/v1/cars/allposted", {
  method: 'GET',
  headers: {
      "Authorization": token
    },
})
.then(response => response.text())
.then(data => {
  console.log(data);
        })
    .catch(error => console.log(error.message));
event.preventDefault();
};