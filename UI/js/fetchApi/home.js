
const all = () => {    
    const token = JSON.parse(localStorage.getItem('authToken'));
fetch("https://cors-anywhere.herokuapp.com/" + 
 "http://automart-webapp.herokuapp.com/api/v1/cars/allposted", {
  method: 'GET',
  headers: {
      "Authorization": token
    },
})
.then(res => res.json())
.then(response => {
    const res = response;
    if (res.data.length > 0) {
      res.data.map((car) => {
        const {
          id, status, model, body_type, manufacturer, year, state, price, product_image, owner,
        } = car
const grid = document.createElement('div');
const listing = document.createElement('div');
const div = document.createElement('div');
const a = document.createElement('a');
const img = document.createElement('img');
const div2 = document.createElement('div');
const h5 = document.createElement('h5');
const a2 = document.createElement('a');
const p = document.createElement('p');
const ul = document.createElement('ul');
const li1 = document.createElement('li');
const li2 = document.createElement('li');
const li3 = document.createElement('li');
const li4 = document.createElement('li');
const i1 = document.createElement('i');
const i2 = document.createElement('i');
const i3 = document.createElement('i');
const i4 = document.createElement('i');

const row = document.querySelector('.js');
const tab = document.querySelector('.tab');
const form = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');


grid.classList.add('grid-md-4', 'grid_listing');
listing.setAttribute('class', 'product-listing-m gray-bg');
div.classList.add('product-listing-img');
a.setAttribute('href', '#');
div2.classList.add('product-listing-content');
p.classList.add('list-price');
ul.classList.add('features_list');
i2.classList.add('fa', 'fa-tachometer');
i3.classList.add('fa', 'fa-calendar');
i4.classList.add('fa', 'fa-car');
a2.setAttribute('href', 'view.html');
input.setAttribute('type', 'text');
input.setAttribute('class', 'amount');


li4.appendChild(i4);
li3.appendChild(i3);
li2.appendChild(i2);
li1.appendChild(i1);

ul.append(li1, li2, li3, li4);
div2.append(h5, p, ul);
a.appendChild(img);
div.appendChild(a);
listing.append(div, div2);
grid.appendChild(listing);
row.appendChild(grid);
img.setAttribute('src', `${product_image}`);

a2.textContent=` <h5><a href="view.html">${model}</a></h5>`;
p.textContent= `${price}`;
i1.innerHTML = `<i onclick="specific(${id})"  class="fa fa-road" aria-hidden="true"></i>${manufacturer}</li>`;
i2.textContent = `${body_type}`;
i3.textContent = `${status}`;
i4.textContent = `${price}`;

button.innerHTML = `<button ")>Submit</button>`
form.append(input, button);
h5.appendChild(form);
})
}
})

.catch ((error) => {
    console.log(error.message);
});
};


const specific = (id) => {
  const token = JSON.parse(localStorage.getItem('authToken'));
  fetch("https://cors-anywhere.herokuapp.com/" + 
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
              window.location = "../UI/view.html";

              if (response.data.status === 200) {
                window.location.reload(true);

                    }
                  }
                })
      .catch(error => console.log(error.message));
  };


/*
<div class="grid-md-4 grid_listing">
            
          </div>
       <div class="product-listing-m gray-bg">
              <div class="product-listing-img"> <a href="#"><img src="img/show.jpg" class="img-responsive" alt="image" /> </a>
              </div>
              <div class="product-listing-content">
               
                <p class="list-price">N89,000</p>
                
                <ul class="features_list">
                  <li><i class="fa fa-road" aria-hidden="true"></i>35,000 km</li>
                  <li><i class="fa fa-tachometer" aria-hidden="true"></i>30.000 miles</li>
                  <li><i class="fa fa-calendar" aria-hidden="true"></i>2005 model</li>
                  <li><i class="fa fa-car" aria-hidden="true"></i>Diesel</li>
                </ul>
              </div>
            </div>
            */

all();

 const fetchCarAds = (id) => {
  const token = JSON.parse(localStorage.getItem('authToken'));
  let new_price = document.querySelector('.update-order-form .price').value;

  fetch("https://cors-anywhere.herokuapp.com/" + 
  "http://automart-webapp.herokuapp.com/api/v1/order/${id}", {
  
      method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Authorization": token
  },
  body: JSON.stringify({ new_price })
})
  .then(res => res.json())
  .then(data => {
   
    if (res.status === 200) {
      const { old_price_offered, new_price_offered } = res.data;

      console.log(data);			
    } else {
              localStorage.setItem("authToken", JSON.stringify(data.data.token));
              const decoded = jwt_decode(data.data.token);
    }
    })
  .catch((error) => {
    const message = document.querySelector('#notification-overlay .message');
    message.innerHTML = error;
    notificationModal.style.display = 'block';
    toggleScroll();
  });
};
