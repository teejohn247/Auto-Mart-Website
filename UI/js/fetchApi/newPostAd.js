const postAd = document.querySelector(".postAd");
const owner = document.querySelector(".owner");
const productImage = document.querySelector(".productImage");
const state = document.querySelector(".state");
const status = document.querySelector(".status");
const price = document.querySelector(".price");
const manufacturer = document.querySelector(".manufacturer");
const model = document.querySelector(".model");
const bodyType = document.querySelector(".bodyType");
const loginError = document.querySelector(".login-error");
const breadcrumb = document.querySelector('.breadcrumb');


const user_id = localStorage.getItem('user_id');
const is_loggedin = localStorage.getItem('is_loggedin');
const firstName = localStorage.getItem('first_name');
const lastName = localStorage.getItem('last_name');

const p0 = document.createElement('p');

p0.innerHTML = `<p>Welcome ${firstName} ${lastName}</p>`
breadcrumb.append(p0);
postAd.addEventListener("submit", event => {

    const formData = new FormData();
    formData.append("product_image", productImage.files[0]);
    formData.append("state", state.value);
    formData.append("status", status.value);
    formData.append("price", price.value);
    formData.append("manufacturer", manufacturer.value);
    formData.append("model", model.value);
    formData.append("body_type", bodyType.value);
    
    const token = JSON.parse(localStorage.getItem('authToken'));

fetch(
 "https://automart-webapp.herokuapp.com/api/v1/car", {
  method: 'POST',
  body: formData,
  headers: {
      "Authorization": token
    },
})
.then(response => response.text())
.then(data => {
  localStorage.setItem("postAd", JSON.stringify(data));
  console.log(data);
  if (data.status === 201) {
  console.log(data);

    loginError.style.display = " block";
            setTimeout(() => {
                loginError.style.display = "none";
            }, 10000);
        }
        })
    .catch(error => console.log(error.message));
event.preventDefault();
});

const specific = (id) => {
    const token = JSON.parse(localStorage.getItem('authToken'));
    fetch(
     `http://automart-webapp.herokuapp.com/api/v1/car/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json', 
          "Authorization": token
        }
        
    })
        .then(res => res.json())
        .then(response => {
          if (response.status === 200) {
            const car = response.data;
            const {
              id, name, img_url, manufacturer, model, year, state,
              price, body_type, fuel_type, mileage, status, doors,
              color, transmission_type, fuel_cap, created_on,
            } = car;
            localStorage.setItem("storageName", JSON.stringify(response));
                console.log(response);
                window.location = "../UI/mark.html";
  
                if (response.data.status === 200) {
                  window.location.reload(true);
  
                      }
                    }
                  })
        .catch(error => console.log(error.message));
    };
