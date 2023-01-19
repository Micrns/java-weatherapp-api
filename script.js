const icon = document.querySelector('.icon');
const search = document.querySelector('.search-bar');


icon.onclick = function(){
    search.classList.toggle('active')
}


/////////////////////////////////////////////////////////////////////////////
const weather_app = document.querySelector('.weather-information');
const change_time = document.querySelector('.time');
const change_date = document.querySelector('.date');
const change_city = document.querySelector('.city');

const weather = document.querySelector('.weather');
const change_weather_icon = document.querySelector('.icon-weather');
const change_weather_condition = document.querySelector('.weather-conditions');

const temperature_info = document.querySelector('.temperature-conditions');
const temperature = document.querySelector('.temperature');

const weather_details = document.querySelector('.weather-details');
const change_percipitation = document.querySelector('.percipitation');
const change_humidity = document.querySelector('.humidity');
const change_wind = document.querySelector('.wind-speed');

const form = document.querySelector(".inputLocation");
const update_search = document.querySelector(".input-search");



//this will be the default city when the website loads

let cityInput = "Palmdale";

form.addEventListener('submit', (e) => {

    /*this will throw an alert when the input is empty */
    if (search.value.length == 0){
        alert('Type in a city name');
    }

    else{

        /*updates the default location to the searched location */
        cityInput = update_search.value;

        WeatherData();

        search.value = "";
    }

    e.preventDefault();

   
});



function daysofWeek(day, month, year){
    
    /* creates a list of strings of the days of the week for reference */

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return weekday[new Date(`${day}/${month}/${year}`).getDay()];

};



//this function will return all of the information that updates the website

function WeatherData(){

    //fetches the weather from an api to get all information
    fetch(`http://api.weatherapi.com/v1/current.json?key=b7dcb6b10cf3473fa6553513231801&q=${cityInput}`)

    //converting json to regular formatting
        .then(response => response.json())
        .then(json => {
            
            // allows me to see the json
            console.log(json);
        
            temperature.innerHTML = json.current.temp_c;



        })


};

WeatherData();
