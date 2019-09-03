const is_loggedin = localStorage.getItem('is_loggedin');

window.onload = () => {
  if (!is_loggedin) {
    window.location.href = '../UI/index.html';
	}
const getAll = () => {    
    const token = JSON.parse(localStorage.getItem('authToken'));
fetch(
 "http://automart-webapp.herokuapp.com/api/v1/cars/allposted", {
  method: 'GET',
  headers: {
      "Authorization": token
    },
})
.then(response => response.text())
.then(data => {
        })
    .catch(error => console.log(error.message));
event.preventDefault();
};
}