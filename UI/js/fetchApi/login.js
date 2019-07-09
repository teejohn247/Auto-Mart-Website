const login = document.querySelector(".login");
const username = document.querySelector(".email");
const password = document.querySelector(".password");
const loginError = document.querySelector(".login-error");
login.addEventListener("submit", event => {
    fetch( "https://cors-anywhere.herokuapp.com/" +
    "http://automart-webapp.herokuapp.com/api/v1/auth/signin", {
        method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ email: username.value, password: password.value })
	})
		.then(res => res.json())
		.then(data => {
            console.log(data);
      if (data.status !== 200) {
				loginError.style.display = " block";
				setTimeout(() => {
					loginError.style.display = "none";
				}, 3000);
			} else {
				localStorage.setItem("authToken", JSON.stringify(data.data.token));
				localStorage.setItem('first_name', data.data.firstName);
				localStorage.setItem('last_name', data.data.lastName);
				localStorage.setItem('email', data.data.email);
				localStorage.setItem('user_id', data.data.id);
				localStorage.setItem('is_admin', data.data.is_admin);
				localStorage.setItem('is_loggedin', true);
                const decoded = jwt_decode(data.data.token);
				
				if (data.data.is_admin) {
					setTimeout(() => {
						window.location.href = '../UI/user';
					}, 1000);
				} else {
					setTimeout(() => {
						window.location.href = '../UI/Admin.html';
					}, 1000);
				}
			}
			})
			
		.catch(error => console.log(error.message));
	event.preventDefault();
});