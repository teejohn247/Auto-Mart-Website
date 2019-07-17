

    
  const orderHistory = () => {    
  const token = JSON.parse(localStorage.getItem('authToken'));
  const storage= JSON.parse(localStorage.getItem('order'));
  fetch(
   `http://automart-webapp.herokuapp.com/api/v1/auth/user/orders`, {
  method: 'GET',
  headers: {
    "Authorization": token
    },
  })
  .then(res => res.json())
  .then(response => {
    console.log(response);
  const res = response;
  if (res.data.length > 0) {
    res.data.map((car) => {
    const {
      id, owner, created_on, product_image, state, status, amount, model, body_type, manufacturer,
    } = car;
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
    a.innerHTML = `<a><button class="mybtn" onclick = "ed(${id})" >Update Order Price</button></a>`
    
    
    div1.append(p, a);
    row.append(div1);
    top.appendChild(row);
    });
    };
  })
  .catch(error => console.log(error.message));
    event.preventDefault(); 
  };
  orderHistory();

 



  