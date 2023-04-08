


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
const change_day_night_icon = document.querySelector('.day-night')
const change_weather_condition = document.querySelector('.weather-condition');

const temperature_info = document.querySelector('.temperature-conditions');
const change_celsius = document.querySelector('.cel');
const change_farenheit = document.querySelector('.faren');

const weather_details = document.querySelector('.weather-details');
const change_percipitation = document.querySelector('.percipitation');
const change_humidity = document.querySelector('.humidity');
const change_wind = document.querySelector('.wind-speed');

const form = document.querySelector(".inputLocation");
const update_search = document.querySelector(".input-search");

const submit = document.querySelector(".submit");

const region = document.querySelector(".region");
const change_am_pm = document.querySelector(".ampm")



//this will be the default city when the website loads

let cityInput = "Palmdale";

form.addEventListener('submit', (e) => {

    /*this will throw an alert when the input is empty */
    if (update_search.value.length == 0){
        alert('Type in a city name');
    }

    else{

        /*updates the default location to the searched location */
        cityInput = update_search.value;

        change_city.innerHTML = cityInput;
        

        WeatherData();

        update_search.value = "";
    }

    e.preventDefault();

   
});



function daysofWeek(day, month, year){
    
    /* creates a list of strings of the days of the week for reference */
    
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const get_day = new Date(`${year}-${month}-${day}`);
    
    return weekday[get_day.getDay()];

};

function militarytoStandard(currentTime){
    console.log(typeof currentTime)
    let hour = Number(currentTime.substr(0,2))
    const mins = currentTime.substr(3,4)
    console.log(typeof hour)
    if (hour > 12){
        hour -= 12;
        change_am_pm.innerHTML = "pm"
    }

    else if (hour == 0){
        hour = 12;

    }

    console.log(hour);

    return hour.toString() + ":" + mins;

}

function dayNight(d){

    let current = ""
    if (d == "night"){
        current = d

    }
    else{
        current = "day"
    }

    return current
}


function weatherCondition(d, code){

    const cloudy_list = [1003, 1006, 1009, 1030, 1135,  1147];
    const rain_list = [1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246];
    const snow_list = [1282, 1279, 1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225];
    const rain_thunder = [1276, 1273];
    
    const sleet_list = [1252, 1249, 1207, 1204, 1069];

}



//this function will return all of the information that updates the website

function WeatherData(){

    //fetches the weather from an api to get all information
    fetch(`http://api.weatherapi.com/v1/current.json?key=b7dcb6b10cf3473fa6553513231801&q=${cityInput}`)

    //converting json to regular formatting
        .then(response => response.json())
        .then(json => {
            
            // allows me to see the json
            console.log(json);


            region.innerHTML = json.location.region + ", " + json.location.country;
            
            
            change_celsius.innerHTML = json.current.temp_c;
            change_farenheit.innerHTML = json.current.temp_f;

            if (json.current.temp_c >= 23 && json.current.temp_f >= 75){

                
                change_celsius.style.color = "#C26E4A";
                change_farenheit.style.color = "#C26E4A";
                document.querySelector('.degree').style.color = "#C26E4A"
                
            }

            change_wind.innerHTML = json.current.wind_kph + "km/h";
            change_humidity.innerHTML = json.current.humidity + "%";
            change_weather_condition.innerHTML = json.current.condition.text;
            

            const location_time_period = json.location.localtime;

            // get the current year
            const current_year = parseInt(location_time_period.substr(0, 4)); 
            //get the current month
            const current_month = parseInt(location_time_period.substr(5,2));
            //get the current day
            const current_day = parseInt(location_time_period.substr(8, 2));
            //get the current time 
            const current_time = location_time_period.substr(11);

            //receive the standard time
            const time = militarytoStandard(current_time);

            
            // change_time.innerHTML = current_time;
            change_time.innerHTML = time;


            change_percipitation.innerHTML = json.current.precip_in + '%';
            
            change_date.innerHTML = `${daysofWeek(current_day,current_month,current_year)} ${current_day}, ${current_month} ${current_year}`;

            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const iconID = json.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            
            const day_night = iconID.substr(0,5);

            
            const current_day_night = dayNight(day_night);
            

            // changes the weather condition icon to match

            const condition_code = json.current.condition.code;


            const cloudy_list = [1003, 1006, 1009, 1030, 1135,  1147];
            const rain_list = [1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246];
            const snow_list = [1282, 1279, 1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225];
            const rain_thunder = [1276, 1273];
            
            const sleet_list = [1252, 1249, 1207, 1204, 1069];


            

            console.log(json.current.condition.code)
            if (cloudy_list.includes(condition_code )){
                change_weather_icon.src = "./icons/condition/cloudy/cloudy-svgrepo-com.svg";
            }
            else if (rain_list.includes(condition_code )){
                change_weather_icon.src =  "./icons/condition/rain/rain-svgrepo-com.svg";

            }
            else if (snow_list.includes(condition_code )){
                change_weather_icon.src = "./icons/condition/snow/snow-svgrepo-com.svg";

            }
            else if(rain_thunder.includes(condition_code )) {
                change_weather_icon.src = "./icons/condition/rain/cloud-storm-svgrepo-com.svg";
            }  
            else if (sleet_list.includes(condition_code )) {
                change_weather_icon.src = "./icons/condition/snow/cloud-snow-rain-svgrepo-com.svg";
            }
            else {
                change_weather_icon.src = "./icons/day/day.svg";
                
            }
            
            
            


        })


};

WeatherData();


