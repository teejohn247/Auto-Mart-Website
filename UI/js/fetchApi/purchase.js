
const user_id = localStorage.getItem('user_id');
const is_loggedin = localStorage.getItem('is_loggedin');
const token = JSON.parse(localStorage.getItem('authToken'));
const storage = JSON.parse(localStorage.getItem('storageName'));

const orderAd = (params) => {
	const {
	  id, price, body_type,
	} = params;
const order = document.getElementById("order1");

order.onclick = (e) => {
	e.preventDefault();
	const amount = document.querySelector(".amount");
    fetch( "https://cors-anywhere.herokuapp.com/" +
    "http://automart-webapp.herokuapp.com/api/v1/order", {
        method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		},
		body: JSON.stringify({ car_id: id,  amount: amount.value })
	})
		.then(res => res.json())
		.then(data => {
		localStorage.setItem("order", JSON.stringify(data));
            console.log(data);
      if (data.status !== 201) {
		console.log(data);			
      
			} else {
		console.log(data);			

			}
			})
		.catch(error => console.log(error.message));
	event.preventDefault();
}
};