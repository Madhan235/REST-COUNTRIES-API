var container = document.createElement('div');
container.className="container";
var row = document.createElement('div');
row.classList.add('row','m-3');
container.append(row);

var res=fetch("https://restcountries.com/v2/all");
res.then((data)=>data.json()).then((data1)=>foo(data1))
.catch((error)=>console.log(error));



function foo(data1) {
  var container = document.createElement('div');
  container.className = "container";
  document.body.append(container);  

  for (var i = 0; i < data1.length; i++) {
    if (i % 3 === 0) {
      var row = document.createElement('div');
      row.classList.add('row', 'm-3');
      container.appendChild(row);   
    }
 
    var col = document.createElement('div');
    col.classList.add('col-lg-4', 'col-md-6', 'col-sm-12', 'mb-3'); 
    col.innerHTML =
        `<div class="card border-primary mb-3" style="width: 18rem;">
            <img src="${data1[i].flag}" class="card-img-top" alt="country image">
            <div class="card-body text-primary">
                <h5 class="card-title"> Name : ${data1[i].name}</h5>
                <p class="card-text"> Capital : ${data1[i].capital}</p>
                <p class="card-text"> Population : ${data1[i].population}</p>
                <p class="tempData${i}">Weather : click ⬇️</p>
                <button class="btn btn-primary" onclick="weatherdata(${data1[i].latlng[0]}, ${data1[i].latlng[1]}, ${i})">Click for Weather</button>
            </div>
        </div>`;

    row.appendChild(col);  
  }
}

async function weatherdata(lat, lon, index) {
  try {
    let apiKey = `8f8ec224fbb6b909071b93048675a770`;
    if (lon === undefined) throw new Error("Invalid Coordinates");
    let res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
    let res3 = await res2.json();
    let temperature = res3?.main.temp;
    let tempMin = res3?.main.temp_min;
    let tempMax = res3?.main.temp_max;
    let feelsLike = res3?.main.feels_like;
    
    var tempData = document.querySelector(`.tempData${index}`);
    tempData.innerHTML = `
      <p>Temperature: ${temperature} °F</p>
      <p>Feels Like: ${feelsLike} °F</p>
      <p>Max Temperature: ${tempMax} °F</p>
      <p>Min Temperature: ${tempMin} °F</p>
    `;
  } catch (error) {
    console.log(error);
  }
}
  
