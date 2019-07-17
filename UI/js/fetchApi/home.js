const is_loggedin = localStorage.getItem('is_loggedin');

window.onload = () => {
  if (!is_loggedin) {
    window.location.href = '../UI/index.html';
	}
const all = (url, msgIfEmpty) => {    
    const token = JSON.parse(localStorage.getItem('authToken'));
    const carList = document.querySelector('.car-list');
    carList.innerHTML = '<div id="loading"><img src="../UI/img/load.gif" /></div>';
    fetch(url, {headers: {
      "Content-Type": 'application/json', 
        "Authorization": token
    }
      })
.then(res => res.json())
.then(response => {
    const res = response;
    if (res.data.length > 0) {
      carList.innerHTML = null;
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
const a4 = document.createElement('a');


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

a2.textContent=` <h5><a href="view.html"> ${model}</a></h5>`;
p.textContent= `${price}`;
i1.innerHTML = `<i class="fa fa-road" aria-hidden="true"></i>${manufacturer}</li>`;
i2.textContent = `${body_type}`;
i3.textContent = `${state}`;
i4.textContent = `${price}`;


a4.innerHTML = `
<a><button class="mybtn home-btn" type="button" onclick="specific(${id})">Take a Tour</button></a>`
form.append( a4);
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
              window.location = "../UI/view.html";

              if (response.data.status === 200) {
                window.location.reload(true);

                    }
                  }
                })
      .catch(error => console.log(error.message));
  };

all();

 const fetchCarAds = (id) => {
  const token = JSON.parse(localStorage.getItem('authToken'));
  let new_price = document.querySelector('.update-order-form .price').value;

  fetch(
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

window.onload = () => {

  // fetch the cars from database and populate the marketplace
   all(
   "http://automart-webapp.herokuapp.com/api/v1/car?status=Available", 'No car ad found!');
};



const filterSelectors = document.querySelectorAll('.common-seletor');
const variables = {
  min_price: null,
  max_price: null,
  manufacturer: null,
  body_type: null,
  state: null,
};
filterSelectors.forEach((selector) => {
  const sel = selector;
  sel.onchange = () => {
    let url = "http://automart-webapp.herokuapp.com/api/v1/car?status=Available"
    if (sel.classList.contains('min-price')) {
      const val = sel.value.replace(/\D/g, '');
      variables.min_price = isNaN(parseFloat(val)) ? null : parseFloat(val);
    } else if (sel.classList.contains('max-price')) {
      const val = sel.value.replace(/\D/g, '');
      variables.max_price = isNaN(parseFloat(val)) ? null : parseFloat(val);
    } else if (sel.classList.contains('manufacturer')) {
      if (sel.checked) {
        variables.manufacturer = sel.value === 'on' ? null : sel.value;
      }
    } else if (sel.classList.contains('body-type')) {
      if (sel.checked) {
        variables.body_type = sel.value === 'on' ? null : sel.value;
      }
    } else if (sel.classList.contains('state')) {
      if (sel.checked) {
        variables.state = sel.value === 'on' ? null : sel.value;
      }
    }
    Object.keys(variables).forEach((key) => {
      if (variables[key] !== null) {
        url += `&${key}=${variables[key]}`;
      }
    });
    all(url, 'No car AD matches the filter parameter.');
  };
  return 0;
});
}
