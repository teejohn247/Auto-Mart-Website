const is_loggedin = localStorage.getItem('is_loggedin');
const user_id = localStorage.getItem('user_id');
const token = JSON.parse(localStorage.getItem('authToken'));
const storage = JSON.parse(localStorage.getItem('storageName'));

const order = document.querySelector("#order1");

order.onclick = (e) => {
	e.preventDefault();
	const amount = document.querySelector(".amount");
    fetch(
    "http://automart-webapp.herokuapp.com/api/v1/order", {
        method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		},
		body: JSON.stringify({  car_id: storage.data.id,  amount: amount.value })
	})
		.then(res => res.json())
		.then(data => {
		localStorage.setItem("order", JSON.stringify(data));
      if (data.status !== 201) {
			} else {
		console.log(data);			

			}
			})
		.catch(error => console.log(error.message));
}