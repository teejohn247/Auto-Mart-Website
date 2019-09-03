const is_loggedin = localStorage.getItem('is_loggedin');

const mark = (id) => {
    const token = JSON.parse(localStorage.getItem('authToken'));
    const markSold = document.querySelector(".yes").value;
    fetch(
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

const getAll = () => {    
    const storage = JSON.parse(localStorage.getItem('storageName'));
   const id = storage.data.id;
    const top = document.querySelector('.top');
    const row = document.querySelector('.view');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const img = document.createElement('img');
    const div4 = document.createElement('div');
    const img1 = document.createElement('img');
    const div5 = document.createElement('div');
    const img2 = document.createElement('img');
    const a = document.createElement('a');
    const a2 = document.createElement('a');
    const div6 = document.createElement('div');
    const div7 = document.createElement('div');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const aside = document.createElement('aside');

    div1.setAttribute('class', 'grid-md-9 grid-md-push-3');


    div7.append(h1,p);
    div7.appendChild(div6);
    div3.appendChild(img);
    div4.appendChild(img1);
    div5.appendChild(img2);
    div2.append(div3,div4,div5,a,a2,div7);
    div1.append(div2);
    row.append(div1, aside);
    top.appendChild(row);

div3.innerHTML =`<div class="mySlides2">
<img src="${storage.data.product_image}" alt="Nature" class="responsive" width="600" height="400">
</div>`

a.innerHTML = `<a class="prev" onclick="plusSlides(-1, 1)" class="mark">&#10094;</a>`
a2.innerHTML = `<a class="next" onclick="plusSlides(1, 1)" class="mark">&#10095;</a>
</div>`


div7.innerHTML = `<div class="result-sorting-wrapper">
<div class="sorting-count slideshow-container"> 
<h1>Price:$${storage.data.price}</h1>    
<p><b>Upgrading to the same 2019 EcoSport model</b><br> costs about $20 more a month, but that's still a good deal.

These offers reflect a Select Inventory bonus of $250, the standard amount on nearly all Ford leases this month. The cash at signing will be $250 higher on non-qualifying models.

Multiple APR offers:

In place of the cash offers on a 2018 or 2019 EcoSport, you can get promotional financing from Ford. Rates on Select Inventory (models in stock more than 60 days) are as follows: 2.9% for 36 months, 4.9% for 60, and 6.9% for 72. Rates are a point higher on non-qualifying models.</p>
<p>The 2019 EcoSport continues flowing into dealers nationwide. Aside from a new Black Appearance Package for the SES model, Ford's smallest crossover is unchanged for its sophomore year. Automatic emergency braking still isn't available, and neither is Ford's new Co-Pilot360 driver assistance system.

The 2018 EcoSport remains on sale in decent numbers. Pricing has settled down nicely since the model's introduction. Leasing is particularly attractive.

Production of the carryover 2020 EcoSport will begin in July.

Current factory offers vary by region and expire July 1, 2019 unless otherwise noted. Examples shown here are for California. Ford often enhances incentives for Memorial Day weekend.</p>

</div>

</div>
<!-- Trigger/Open The Modal -->

<button id="myB" class="mybtn wide">Mark as sold</button>
<!-- The Modal -->
<div id="myModal" class="modal">

<!-- Modal content -->
<div class="modal-content">
<span class="close">&times;</span>
<form id="contact" action="" method="post">
<h4>Mark as sold?</h4>
<fieldset>
<h5>Are you sure you want to mark as sold</h5>
</fieldset>

<fieldset>
<button name="submit" type="submit" class ="contact-submit" data-submit="...Sending">No</button>
<button class ="contact-submit yes" name="submit" type="submit" class ="contact-submit" data-submit="...Sending" value="sold" onclick="mark(${id})">Yes</button>

</fieldset>
</form>
</div>

</div>

<!-- The Modal -->
<div id="myModa" class="modal">

<div class="modal-content">
<span class="close3">&times;</span>
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

</div>`


    aside.innerHTML = `
    <aside class="grid-md-3 grid-md-pull-9">
     <div class="sidebar_widget">
    <div class="widget_heading">
      <h5><i class="fa fa-filter" aria-hidden="true"></i> Find Your Dream Car </h5>
    </div>
    <div class="sidebar_filter">
      <form action="#" method="get">
        <div class="form-group select">
          <select class="form-control">
            <option>Select Location</option>
            <option>Audi</option>
            <option>BMW</option>
            <option>Nissan</option>
            <option>Toyota</option>
            <option>Volvo</option>
            <option>Mazda</option>
            <option>Mercedes-Benz</option>
            <option>Lotus</option>
          </select>
        </div>
        <div class="form-group select">
          <select class="form-control">
            <option>Select Brand</option>
            <option>Audi</option>
            <option>BMW</option>
            <option>Nissan</option>
            <option>Toyota</option>
            <option>Volvo</option>
            <option>Mazda</option>
            <option>Mercedes-Benz</option>
            <option>Lotus</option>
          </select>
        </div>
        <div class="form-group select">
          <select class="form-control">
            <option>Select Model</option>
            <option>Series 1</option>
            <option>Series 2</option>
            <option>Series 3</option>
            <option>Series 4</option>
            <option>Series 6</option>
          </select>
        </div>
        <div class="form-group select">
          <select class="form-control">
            <option>Year of Model </option>
            <option>2016</option>
            <option>2015</option>
            <option>2014</option>
            <option>2013</option>
            <option>2012</option>
            <option>2011</option>
            <option>2010</option>
            <option>2009</option>
            <option>2008</option>
          </select>
        </div>
      
        <div class="form-group select">
          <select class="form-control">
            <option>Type of Car </option>
            <option>New Car</option>
            <option>Used Car</option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit" class="search"><i class="fa fa-search" aria-hidden="true"></i> Search Car</button>
        </div>
      </form>
    </div>
  </div>
  <div class="sidebar_widget sell_car_quote">
    <div class="white-text div_zindex text-center">
      <h3>Buy Your Car</h3>
      <p>Search through and buy a now!</p>
      <a href="#" class="btn">Make Purchase <span class="angle_arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></span></a> </div>
    <div class="dark-overlay"></div>
  </div>
  <div class="sidebar_widget">
    <div class="widget_heading">
      <h5><i class="fa fa-car" aria-hidden="true"></i> Recently Listed Cars</h5>
    </div>
    <div class="recent_addedcars">
      <ul>
        <li class="gray-bg">
          <div class="recent_post_img"> <a href="#"><img src="img/recent.jpg" alt="image"></a> </div>
          <div class="recent_post_title"> <a href="#">Ford Shelby GT350</a>
            <p class="widget_price">$92,000</p>
          </div>
        </li>
        <li class="gray-bg">
          <div class="recent_post_img"> <a href="#"><img src="img/recent.jpg" alt="image"></a> </div>
          <div class="recent_post_title"> <a href="#">BMW 535i</a>
            <p class="widget_price">$92,000</p>
          </div>
        </li>
        <li class="gray-bg">
          <div class="recent_post_img"> <a href="#"><img src="img/recent.jpg" alt="image"></a> </div>
          <div class="recent_post_title"> <a href="#">Mazda CX-5 SX, V6, ABS, Sunroof </a>
            <p class="widget_price">$92,000</p>
          </div>
        </li>
        <li class="gray-bg">
          <div class="recent_post_img"> <a href="#"><img src="img/recent.jpg" alt="image"></a> </div>
          <div class="recent_post_title"> <a href="#">Ford Shelby GT350 </a>
            <p class="widget_price">$92,000</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
`

};
getAll();

