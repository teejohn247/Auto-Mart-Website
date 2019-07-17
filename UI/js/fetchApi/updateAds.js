
const editAd = (id) => {
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
       `http://automart-webapp.herokuapp.com/api/v1/order/${id}`, {
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
         `http://automart-webapp.herokuapp.com/api/v1/car/${id}/status`, {
          method: 'PATCH',
          headers: {
            "Content-Type": 'application/json', 
              "Authorization": token
            },
          body: JSON.stringify({ status: markSold })
        })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                          }
                    })
            .catch(error => console.log(error.message));
    event.preventDefault();
    
        };
       
  
  const adHistory = () => {    
    const token = JSON.parse(localStorage.getItem('authToken'));
    const storage= JSON.parse(localStorage.getItem('postAd'));
  fetch("https://cors-anywhere.herokuapp.com/" + 
   `http://automart-webapp.herokuapp.com/api/v1/auth/user/ads`, {
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
     selector.append(first);
     img.setAttribute('src', `${product_image}`);

     a1.textContent = `${model}`;
     p.textContent = `${price}`;
     button.textContent = "Delete";
     i1.setAttribute('aria-hidden', 'true');
     i2.setAttribute('aria-hidden', 'true');
     i3.setAttribute('aria-hidden', 'true');
     i4.setAttribute('aria-hidden', 'true');
     span.innerHTML = `<i class="fa fa-map-marker" aria-hidden="true"></i> ${manufacturer} </span></div>`;
     li1.innerHTML = `<a><i class="fa fa-road" aria-hidden="true"></i>${state}</li></a>`;     
     li2.innerHTML = `<i class="fa fa-car" aria-hidden="true"></i>${status}</li>`;
     li4.innerHTML = `<i class="fa fa-car" aria-hidden="true"></i>${year}</li>`;
     li3.innerHTML = `<i class="fa fa-calendar"" aria-hidden="true"></i>${body_type}</li>`;
     a.innerHTML = `<a><button class="mybtn" onclick="specific(${id})">Mark as sold</button></a>`
     a1.innerHTML = `<a style="padding:10px;" ><button class="mybtn" onclick = "ed(${id})">Edit Order</button></a>`
     

        });
      };
    })
    .catch(error => console.log(error.message));
  };
  adHistory();