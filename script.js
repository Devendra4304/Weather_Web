const inputBox = document.querySelector('.input-box');
const searchbtn = document.getElementById('search-btn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windspeed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');



async function checkWeather(city) {
    const api_key = "591c2c8351c42ac50a69807d65741546";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city??"jaipur"}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(Response => Response.json());
    // console.log(weather_data);

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}celsius`;
    description.innerHTML = `${weather_data.weather[0].description}`
    humidity.innerHTML = `${weather_data.main.humidity}%`
    windspeed.innerHTML = `${weather_data.wind.speed}Km/Hr`

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "/WeatherApp/assets/cloud.png"
            break;
        case 'Clear':
            weather_img.src = "/WeatherApp/assets/clear.png"
            break;
        case 'Rain':
            weather_img.src = "/WeatherApp/assets/rain.png"
            break;
        case 'Snow':
            weather_img.src = "/WeatherApp/assets/snow.png"
            break;
        case 'Mist':
            weather_img.src = "/WeatherApp/assets/mist.png"
            break;
    }

}

searchbtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
})
