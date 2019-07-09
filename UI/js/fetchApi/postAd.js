


const autoRefresh = (time) => {
  setTimeout(() => {
    document.location.reload();
  }, time);
};

const del = (id) => {
const token = JSON.parse(localStorage.getItem('authToken'));
fetch("https://cors-anywhere.herokuapp.com/" + 
 `http://automart-webapp.herokuapp.com/api/v1/car/${id}`, {
  method: 'DELETE',
  headers: {
    "Content-Type": 'application/json', 
      "Authorization": token
    }
})
		.then(res => res.json())
		.then(data => {
            console.log(data);
            if (data.status === 200) {
              window.location.reload(true);
                  }
     
			})
    .catch(error => console.log(error.message));
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

postAd.addEventListener("submit", event => {

    const formData = new FormData();
    formData.append("owner", owner.value);
    formData.append("product_image", productImage.files[0]);
    formData.append("state", state.value);
    formData.append("status", status.value);
    formData.append("price", price.value);
    formData.append("manufacturer", manufacturer.value);
    formData.append("model", model.value);
    formData.append("body_type", bodyType.value);
    
    const token = JSON.parse(localStorage.getItem('authToken'));

fetch("https://cors-anywhere.herokuapp.com/" + 
 "https://automart-webapp.herokuapp.com/api/v1/car", {
  method: 'POST',
  body: formData,
  headers: {
      "Authorization": token
    },
})
.then(response => response.text())
.then(data => {
  console.log(data);
  localStorage.setItem("postAd", data);
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

const getAll = () => {    
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
          id, status, model, body_type, manufacturer, year, state, price, product_image, owner_id,
        } = car;

        const first = document.createElement('div');
        const second = document.createElement('div');
        const third = document.createElement('div');
        const img = document.createElement('img');
        const fourth = document.createElement('div');
        const a1 = document.createElement('a');
        const h5 = document.createElement('h5');
        const p = document.createElement('p');
        const fifth = document.createElement('div');
        const span = document.createElement('span');
        const i = document.createElement('i');
        const ul = document.createElement('ul');
        const li1 = document.createElement('li');
        const li2 = document.createElement('li');
        const li3 = document.createElement('li');
        const li4 = document.createElement('li');
        const i1 = document.createElement('i');
        const i2 = document.createElement('i');
        const i3 = document.createElement('i');
        const i4 = document.createElement('i');
        const a = document.createElement('a');
        const form1 = document.createElement('form');
        const edit = document.createElement('button');

        const button = document.createElement('button');
        const popup1 = document.querySelector('#popup1');
        const content = document.querySelector('.content');
        const popup = document.querySelector('.popup');
        const ord = document.querySelector('.ord');


     const selector = document.querySelector('.js');
     first.classList.add('grid-md-4', 'grid_listing')
     second.classList.add('product-listing-m', 'gray-bg');
     third.classList.add('product-listing-img');
     img.classList.add('img-responsive');
     fourth.classList.add('product-listing-content');
     p.classList.add('list-price');
     fifth.classList.add('car-location');
     i.classList.add('fa', 'fa-map-marker');
     ul.classList.add('features_list');
     i1.classList.add('fa', 'fa-tachometer');
     i2.classList.add('fa', 'fa-road');
     i3.classList.add('fa', 'fa-calendar');
     i4.classList.add('fa', 'fa-car');
     i4.classList.add('fa', 'fa-car');
     a.setAttribute('href', '#popup1');
     button.classList.add('del');


     li4.appendChild(i4);
     li3.appendChild(i3);
     li2.appendChild(i2);
     li1.appendChild(i1);

     ul.append(li1, li2, li3, li4);
     a.appendChild(button);
     span.appendChild(i);
     fifth.appendChild(span);
     h5.appendChild(a1);
     fourth.appendChild(h5);
     fourth.appendChild(p);
     fourth.appendChild(fifth);
     fourth.appendChild(ul);
     fourth.appendChild(a);
     third.appendChild(img);
     second.append( third, fourth);
     first.appendChild(second);
     selector.append(first, modal);
     img.setAttribute('src', `${product_image}`);

     a1.textContent = `${model}`;
     p.textContent = `${price}`;
     button.textContent = "Delete";
     i1.setAttribute('aria-hidden', 'true');
     i2.setAttribute('aria-hidden', 'true');
     i3.setAttribute('aria-hidden', 'true');
     i4.setAttribute('aria-hidden', 'true');
     span.innerHTML = `<i class="fa fa-map-marker" aria-hidden="true"></i> ${manufacturer} </span></div>`;
     li1.innerHTML = `<a onclick="specific(${id})"><i class="fa fa-road" aria-hidden="true"></i>${state}</li></a>`;     
     li2.innerHTML = `<i class="fa fa-car" aria-hidden="true"></i>${status}</li>`;
     li4.innerHTML = `<i class="fa fa-car" aria-hidden="true"></i>${year}</li>`;
     li3.innerHTML = `<i class="fa fa-calendar"" aria-hidden="true"></i>${body_type}</li>`;
     popup1.innerHTML = ` 
     <div class="popup">
     <div class="content"><p>Are you sure you want to delete?</p>
     <div class="center"><a class="del2"onclick="del(${id})">Yes</a>
     <a class="del2" href="#">No</a></div> </div>
     </div>`
    
   
     
/*
    <button align="center"id="myB" class="mybtn">Edit Order</button>  

<!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <form id="contact" action="" method="post">
    <h4>Update Ad</h4>
    <fieldset>
      <input placeholder="First Name" type="text" tabindex="1" required autofocus>
    </fieldset>
    <fieldset>
      <input placeholder="Email" type="email" tabindex="2" required>
    </fieldset>
    <fieldset>
      <input placeholder="New Price" type="email" tabindex="2" required>
    </fieldset>
    <fieldset>
      <input placeholder="Country" type="email" tabindex="2" required>
    </fieldset>
      <fieldset>
      <input placeholder="Zip-Code" type="email" tabindex="2" required>
    </fieldset>
    <fieldset>
      <button name="submit" type="submit" class ="contact-submit" data-submit="...Sending">Update Order</button>
    </fieldset>
  </form>
  </div>
</div>

</div>


    </div>


           <div class="product-listing-m gray-bg">
              <div class="product-listing-img"> <a href="#"><img class="img-responsive" alt="image" /> </a>
              </div>
              <div class="product-listing-content">
                <h5><a href="#">Mazda CX-5 SX, V6, ABS, Sunroof </a></h5>
                <p class="list-price">N89,000</p>
                <div class="car-location"><span><i class="fa fa-map-marker" aria-hidden="true"></i> Colorado, USA</span></div>
                <ul class="features_list">
                  <li><i class="fa fa-road" aria-hidden="true"></i>35,000 km</li>
                  <li><i class="fa fa-tachometer" aria-hidden="true"></i>30.000 miles</li>
                  <li><i class="fa fa-calendar" aria-hidden="true"></i>2005 model</li>
                  <li><i class="fa fa-car" aria-hidden="true"></i>Diesel</li>
                </ul>
                <a href="#popup1"><button class="del">Delete</button></a>
              </div>
            </div>
          -->
          </div>
<!--
          <div class="grid-md-4 grid_listing">
            <div class="product-listing-m gray-bg">
              <div class="product-listing-img"> <a href="#"><img src="img/show.jpg" class="img-responsive" alt="image" /> </a>
              </div>
              <div class="product-listing-content">
                <h5><a href="#">Mazda CX-5 SX, V6, ABS, Sunroof </a></h5>
                <p class="list-price">N89,000</p>
                <div class="car-location"><span><i class="fa fa-map-marker" aria-hidden="true"></i> Colorado, USA</span></div>
                <ul class="features_list">
                  <li><i class="fa fa-road" aria-hidden="true"></i>35,000 km</li>
                  <li><i class="fa fa-tachometer" aria-hidden="true"></i>30.000 miles</li>
                  <li><i class="fa fa-calendar" aria-hidden="true"></i>2005 model</li>
                  <li><i class="fa fa-car" aria-hidden="true"></i>Diesel</li>
                </ul>
                <a href="#popup1"><button class="del">Delete</button></a>
             

              </div>
            </div>
          </div>

          <div class="grid-md-4 grid_listing">
            <div class="product-listing-m gray-bg">
              <div class="product-listing-img"> <a href="#"><img src="img/show.jpg" class="img-responsive" alt="image" /> </a>
              </div>
              <div class="product-listing-content">
                <h5><a href="#">Mazda CX-5 SX, V6, ABS, Sunroof </a></h5>
                <p class="list-price">N89,000</p>
                <div class="car-location"><span><i class="fa fa-map-marker" aria-hidden="true"></i> Colorado, USA</span></div>
                <ul class="features_list">
                  <li><i class="fa fa-road" aria-hidden="true"></i>35,000 km</li>
                  <li><i class="fa fa-tachometer" aria-hidden="true"></i>30.000 miles</li>
                  <li><i class="fa fa-calendar" aria-hidden="true"></i>2005 model</li>
                  <li><i class="fa fa-car" aria-hidden="true"></i>Diesel</li>
                </ul>
                <a href="#popup1"><button class="del">Delete</button></a>
              


              </div>
            </div>
          </div>

          <div class="grid-md-4 grid_listing">
            <div class="product-listing-m gray-bg">
              <div class="product-listing-img"> <a href="#"><img src="img/show.jpg" class="img-responsive" alt="image" /> </a>
              </div>
              <div class="product-listing-content">
                <h5><a href="#">Mazda CX-5 SX, V6, ABS, Sunroof </a></h5>
                <p class="list-price">N89,000</p>
                <div class="car-location"><span><i class="fa fa-map-marker" aria-hidden="true"></i> Colorado, USA</span></div>
                <ul class="features_list">
                  <li><i class="fa fa-road" aria-hidden="true"></i>35,000 km</li>
                  <li><i class="fa fa-tachometer" aria-hidden="true"></i>30.000 miles</li>
                  <li><i class="fa fa-calendar" aria-hidden="true"></i>2005 model</li>
                  <li><i class="fa fa-car" aria-hidden="true"></i>Diesel</li>
                </ul>
                <a href="#popup1"><button class="del">Delete</button></a>
              


              </div>
            </div>
          </div>

          <div class="grid-md-4 grid_listing">
            <div class="product-listing-m gray-bg">
              <div class="product-listing-img"> <a href="#"><img src="img/show.jpg" class="img-responsive" alt="image" /> </a>
              </div>
              <div class="product-listing-content">
                <h5><a href="#">Mazda CX-5 SX, V6, ABS, Sunroof </a></h5>
                <p class="list-price">N89,000</p>
                <div class="car-location"><span><i class="fa fa-map-marker" aria-hidden="true"></i> Colorado, USA</span></div>
                <ul class="features_list">
                  <li><i class="fa fa-road" aria-hidden="true"></i>35,000 km</li>
                  <li><i class="fa fa-tachometer" aria-hidden="true"></i>30.000 miles</li>
                  <li><i class="fa fa-calendar" aria-hidden="true"></i>2005 model</li>
                  <li><i class="fa fa-car" aria-hidden="true"></i>Diesel</li>
                </ul>
                <a href="#popup1"><button class="del">Delete</button></a>
              


              </div>
            </div>
          </div>

          <div class="grid-md-4 grid_listing">
            <div class="product-listing-m gray-bg">
              <div class="product-listing-img"> <a href="#"><img src="img/show.jpg" class="img-responsive" alt="image" /> </a>
              </div>
              <div class="product-listing-content">
                <h5><a href="#">Mazda CX-5 SX, V6, ABS, Sunroof </a></h5>
                <p class="list-price">N89,000</p>
                <div class="car-location"><span><i class="fa fa-map-marker" aria-hidden="true"></i> Colorado, USA</span></div>
                <ul class="features_list">
                  <li><i class="fa fa-road" aria-hidden="true"></i>35,000 km</li>
                  <li><i class="fa fa-tachometer" aria-hidden="true"></i>30.000 miles</li>
                  <li><i class="fa fa-calendar" aria-hidden="true"></i>2005 model</li>
                  <li><i class="fa fa-car" aria-hidden="true"></i>Diesel</li>
                </ul>
                <a href="#popup1"><button class="del">Delete</button></a>
              </div>
            </div>
          </div>
        */
})
}
})
.catch ((error) => {
    console.log(error.message);
});
};

getAll();


const editAd = (id) => {
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
              window.location = "../UI/mark.html";

              if (response.data.status === 200) {
                window.location.reload(true);

                    }
                  }
                })
      .catch(error => console.log(error.message));
  };

  const ed = (id) => {
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
                 window.location = "../UI/update.html";
                if (response.data.status === 200) {
                  window.location.reload(true);
  
                      }
                    }
                  })
        .catch(error => console.log(error.message));
    };
   
    const mark = (id) => {
      const token = JSON.parse(localStorage.getItem('authToken'));
      const markSold = document.querySelector(".yes").value;
      fetch("https://cors-anywhere.herokuapp.com/" + 
       `http://automart-webapp.herokuapp.com/api/v1/car/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": 'application/json', 
            "Authorization": token
          },
        body: JSON.stringify({ status: markSold })
      })
              .then(res => res.json())
              .then(data => {
                  console.log(data);
                  if (data.status === 200) {
                  console.log(data);
  
                        }
           
                  })
          .catch(error => console.log(error.message));
  event.preventDefault();
  
      };
     

const adHistory = () => {    
  const token = JSON.parse(localStorage.getItem('authToken'));
  const storage= JSON.parse(localStorage.getItem('postAd'));
fetch("https://cors-anywhere.herokuapp.com/" + 
 `http://automart-webapp.herokuapp.com/api/v1/viewads/${storage.data.owner}`, {
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
        id, owner, created_on, product_image, state, status, price, model, body_type, manufacturer,
      } = car;
      console.log(storage.data.productImage);
      const top = document.querySelector('.post');
      const row = document.querySelector('.myAd');
      const div = document.createElement('div');
      const img = document.createElement('img');
      const div1 = document.createElement('div');
      const p = document.createElement('p');
      const a = document.createElement('a');
      const a1 = document.createElement('a');

    
    
      div.setAttribute('class', 'grid-md-3 pics');
      img.setAttribute('src', `${product_image}`);
      img.setAttribute('onclick', `editAd(${id})`);

      div1.setAttribute('class', 'grid-md-3 my-text')
      p.innerHTML = `<p align="center" class="pur">${manufacturer}</p>`
      a.innerHTML = `<a href="mark.html"><button class="mybtn">Mark as sold</button></a>`
      a1.innerHTML = `<a style="padding:10px;" ><button class="mybtn" onclick = "ed(${id})">Edit Order</button></a>`

    
      div1.append(p, a, a1);
      div.appendChild(img);
      row.append(div, div1);
      top.appendChild(row);
      });
    };
  })
  .catch(error => console.log(error.message));
};
adHistory();

const updatePrice = (id) => {
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
              localStorage.setItem("order", JSON.stringify(response));     
               window.location = "../UI/updateOrder.html";
              if (response.data.status === 200) {
                window.location.reload(true);

                    }
                  }
                })
      .catch(error => console.log(error.message));
  };
  
const orderHistory = () => {    
const token = JSON.parse(localStorage.getItem('authToken'));
const storage= JSON.parse(localStorage.getItem('order'));
fetch("https://cors-anywhere.herokuapp.com/" + 
 `http://automart-webapp.herokuapp.com/api/v1/vieworders/${storage.data.buyer}`, {
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
    id, owner, created_on, product_image, state, status, amount, model, body_type, manufacturer,
  } = car;
  console.log(storage.data.product_image);
  const top = document.querySelector('.orde');
  const row = document.querySelector('.myOrder');
  const div = document.createElement('div');
  const img = document.createElement('img');
  const div1 = document.createElement('div');
  const p = document.createElement('p');
  const a = document.createElement('a');
  
  
  div.setAttribute('class', 'grid-md-3 pics');
  div1.setAttribute('class', 'grid-md-3 my-text');
  p.innerHTML = `<p align="center" class="pur">Order id:${id}<br>price: ${amount}</p>`
  a.innerHTML = `<a ><button class="mybtn" onclick = "updatePrice(${id})">Update Order Price</button></a>`
  
  
  div1.append(p, a);
  div.appendChild(img);
  row.append(div, div1);
  top.appendChild(row);
  });
  };
})
.catch(error => console.log(error.message));
  event.preventDefault(); 
};
orderHistory();