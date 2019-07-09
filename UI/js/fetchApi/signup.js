const signup = document.querySelector(".login");
const email = document.querySelector(".email");
const firstName = document.querySelector(".fname");
const lastName = document.querySelector(".lname");
const password = document.querySelector(".password");
const address = document.querySelector(".addres");
const admin = document.querySelector(".admin");
const loginError = document.querySelector(".login-error");


signup.addEventListener("submit", event => {
    fetch( "https://cors-anywhere.herokuapp.com/" +
    "http://automart-webapp.herokuapp.com/api/v1/auth/signup", {
        method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
        body: JSON.stringify({ email:email.value, first_name: firstName.value, last_name: lastName.value,
          password: password.value, address:address.value})
	})
		.then(res => res.json())
		.then(data => {
            console.log(data);
      if (data.status !== 201) {
        loginError.style.display = " block";
				setTimeout(() => {
					loginError.style.display = "none";
				}, 3000);
			} else {
                localStorage.setItem("authToken", JSON.stringify(data.data.token));
				window.location = "../UI/index.html";
			}
			})
		.catch(error => console.log(error.message));
	event.preventDefault();
});