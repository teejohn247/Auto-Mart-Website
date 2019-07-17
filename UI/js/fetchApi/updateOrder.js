 
const is_loggedin = localStorage.getItem('is_loggedin');

window.onload = () => {
  if (!is_loggedin) {
    window.location.href = '../UI/index.html';
	}

  const updatePrice = (id) => {
    const token = JSON.parse(localStorage.getItem('authToken'));
    const price = document.querySelector(".price").value;
    fetch(
     `http://automart-webapp.herokuapp.com/api/v1/order/${id}/price`, {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json', 
          "Authorization": token
        },
        body: JSON.stringify({ price_offered: price })
        
    })
        .then(res => res.json())
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            const car = response.data;
            const {
              id, name, img_url, manufacturer, model, year, state,
              price, body_type, fuel_type, mileage, status, doors,
              color, transmission_type, fuel_cap, created_on,
            } = car;
                localStorage.setItem("order", JSON.stringify(response));     
                 window.location = "../UI/user.html";
                if (response.data.status === 200) {
                  window.location.reload(true);
  
                      }
                    }
                  })
        .catch(error => console.log(error.message));
    };
   const populate = () => {  
  
    const storage = JSON.parse(localStorage.getItem('order'));
    const id = storage.data.id; 
    console.log(storage.data.price_offered); 
  
              const modal = document.querySelector('.tab');
              const form = document.createElement('form');
      
              form.setAttribute('id','contact');
              form.setAttribute('method','POST');
            
              modal.appendChild(form);
              form.innerHTML =
          `
          <input type="text" value="${storage.data.price_offered}" class="price">
          <button type="button" class="mybtn" onclick = "updatePrice(${id})">Update Order Price</button>
    `
  };
  populate();

}
  