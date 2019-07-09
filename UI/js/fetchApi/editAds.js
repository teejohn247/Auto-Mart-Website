
    

const update = (id) => {
  
  const token = JSON.parse(localStorage.getItem('authToken'));
  
const updatePrice = document.querySelector(".price").value;

  fetch("https://cors-anywhere.herokuapp.com/" + 
   `http://automart-webapp.herokuapp.com/api/v1/cars/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
        "Authorization": token
      },
    body: JSON.stringify({ price: updatePrice }),

  })
    
          .then(res => res.json())
          .then(data => {
              if (data.status === 200) {
              console.log(data);
              localStorage.setItem("storageName", JSON.stringify(data));

                    }
              })
      .catch(error => console.log(error.message));
event.preventDefault();

  };

const populate = () => {  
  
  const storage = JSON.parse(localStorage.getItem('storageName'));
  const id = storage.data.id;  
console.log(storage.data.product_image);

            const modal = document.querySelector('.tab');
            const form = document.createElement('form');
            const h4 = document.createElement('h4');
            const input1 = document.createElement('input');
            const input2 = document.createElement('input');
            const div = document.createElement('div');
            const select = document.createElement('select');
            const option = document.createElement('option');
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            
            const div1 = document.createElement('div');
            const selectStatus = document.createElement('select');
            const optionStatus = document.createElement('option');
            const option1Status = document.createElement('option');
            const option2Status = document.createElement('option');
            const input3 = document.createElement('input');
            const input4 = document.createElement('input');
            const input5 = document.createElement('input');
            const input6 = document.createElement('input');
            const button = document.createElement('button');
    
            form.setAttribute('id','contact');
            form.setAttribute('method','POST');
            input1.setAttribute('type', 'file');
            input1.setAttribute('placeholder', 'owner');
            input1.setAttribute('class', 'owner');
            select.setAttribute('class', 'state');
            selectStatus.setAttribute('class', 'status');
            input3.setAttribute('type', 'text');
            input4.setAttribute('type', 'text');
            input5.setAttribute('type', 'text');
            input6.setAttribute('type', 'text');
            input3.setAttribute('class', 'price');
            input4.setAttribute('class', 'manufacturer');
            input5.setAttribute('class', 'model');
            input6.setAttribute('class', 'bodyType');

            select.append(option, option1, option2);
            selectStatus.append(optionStatus, option1Status, option2Status);
            div.appendChild(select);
            div1.appendChild(selectStatus);
            form.append(h4, input1, input2, div, div1, input3, input4, input5, input6, button);
            modal.appendChild(form);
            div.innerHTML = `<select class="state">
            <option>${storage.data.state}</option>
            <option>used</option>
            <option>new</option>
          </select>`
          form.innerHTML =
        `
         <input type="text" value="${storage.data.price}" class="price">
         
         <input type="checkbox" onclick="update(${id})" type="submit" class ="contact-submit" data-submit="...Sending">`
};
populate();


