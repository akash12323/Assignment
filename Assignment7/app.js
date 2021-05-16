
const form = document.querySelector('form');
const ul = document.querySelector('ul');



const city = document.querySelector('#city');
const temp = document.querySelector('#temp');
const main = document.querySelector('#main');
const image = document.querySelector('#icon');
const divs = document.querySelector('.container');
const minTemp = document.querySelector('#minTemp');
const maxTemp = document.querySelector('#maxTemp');
const date = document.querySelector('#date');


const api_key = "911b61c604043b0be82300d61989a363";
let lat,lon;

const getWeatherByCity = async (cityName)=>{

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;

    const res = await axios.get(url);

    var ts = new Date();
    date.innerText = ts.toDateString();

    console.log(res.data);

    lon = res.data.coord.lon;
    lat = res.data.coord.lat;

    city.innerText = res.data.name;
    temp.innerText = res.data.main.temp+"°";
    main.innerText = res.data.weather[0].main;
    const img = "http://openweathermap.org/img/wn/"+res.data.weather[0].icon+"@2x.png";
    image.style.backgroundImage = `url(${img})`;
    minTemp.innerText = res.data.main.temp_min+"°";
    maxTemp.innerText = res.data.main.temp_max+"°";


    divs.style.visibility = 'visible';
    const body = document.querySelector('body');
    body.style.background = "linear-gradient(#343a40, #9198e5)";

    getHourlyForecast(lon,lat);

}






const getHourlyForecast = async (lon,lat)=>{
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,current,alerts&appid=${api_key}&units=metric`;
    const res = await axios.get(url);

    // console.log(res.data.hourly);

    const lis = document.querySelectorAll('.first');
    for(let x of lis){
        x.remove();
    }

    let i=0;
    for(let forcast of res.data.hourly){
        if(i>12){
            break
        }
        const li = document.createElement('li');
        li.classList.add('first');
        i = i+1;

        let timeobj = new Date(forcast.dt * 1000);
        let hours = timeobj.getUTCHours().toString().padStart(2,0);
        // let min = timeobj.getUTCMinutes().toString().padStart(2,0);
        if(hours>12){
            hours = hours-12 +" PM";
        }
        else{
            hours = hours +" AM";
        }

        li.innerHTML = `<div class="forecast">
            <h1>${hours}</h1>
            <img src="http://openweathermap.org/img/wn/${forcast.weather[0].icon}@2x.png" alt="">
            <h2>${forcast.temp}°C</h2>
            <p>${forcast.weather[0].main}</p>
        </div>`;

        ul.append(li);
    }
}



form.addEventListener('submit',function(e){
    e.preventDefault();

    const input = document.querySelector('input');
    const cityName = input.value;

    getWeatherByCity(cityName);

    input.value = "";
})


