const API = {
    key: "c1631ff1d4895e21567d36c4ea7e8e4c",
    baseUrl: "http://api.openweathermap.org/data/2.5/"
};

// Selectors
let cityInput = document.querySelector('#city-input');
let submitButton = document.querySelector('#get-weather');
let city = document.querySelector('#w-city');
let icon = document.querySelector('#w-icon');
let desc = document.querySelector('#w-desc');
let temp = document.querySelector('#w-temp');
let alertBox = document.querySelector('.alert');


let weatherIcons = {
    thunderstorm: "wi-thunderstorm",
    drizzle: "wi-sleet",
    rain: "wi-storm-showers",
    snow: "wi-snow",
    atmosphere: "wi-fog",
    clear: "wi-day-sunny",
    clouds: "wi-day-fog"

};

// Functions

function getWeatherIcon(icons, rangeId) {
    switch(true){
        case rangeId >= 200 && rangeId <= 232:
            return weatherIcons.thunderstorm;
        case rangeId >= 300 && rangeId <= 321:
            return weatherIcons.drizzle;
        case rangeId >= 500 && rangeId <= 531:
            return weatherIcons.rain;
        case rangeId >= 600 && rangeId <= 622:
            return weatherIcons.snow;
        case rangeId >= 701 && rangeId <= 781:
            return weatherIcons.atmosphere;
        case rangeId === 800:
            return weatherIcons.clear;
        case rangeId >= 801 && rangeId <= 804:
            return weatherIcons.clouds;
        default:
            return weatherIcons.clear;
    }
}


function createNewIcon(icons, rangeId) {
    let newIcon = getWeatherIcon(icons, rangeId);
    icon.removeChild(icon.firstChild);
    return `<i class="wi ${newIcon} display-1"></i>`
}



function getCity(event) {
    event.preventDefault();
    let searchedCity = cityInput.value;


    if(searchedCity.length > 0) {
        console.log(searchedCity);
        fetch(`${API.baseUrl}weather?q=${searchedCity}&units=metric&appid=${API.key}`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if (response.cod === "404") {

                // Clear the cityInput text
                cityInput.value = "";
                
                alertBox.innerHTML = "Please Enter A Valid City."
                alertBox.classList.remove("d-none");
    
                setTimeout(function(){
                    alertBox.classList.add("d-none");
                }, 5000);
            }

            else {
                city.innerHTML = `${response.name}, ${response.sys.country}`
                temp.innerHTML = `${response.main.temp}&#8451;`
                desc.innerHTML = `${response.weather[0].main}`
                icon.innerHTML = createNewIcon(weatherIcons, `${response.weather[0].id}`)

                // Clear the cityInput text
                cityInput.value = "";
            }


        })
        .catch(error => {
            console.log(error)
            alertBox.innerHTML = "An Error Occured, Kindly Retry"
            alertBox.classList.remove("d-none");
    
            setTimeout(function(){
                alertBox.classList.add("d-none");
            }, 5000);
        });
    }


    else {
        // Clear the cityInput text
        cityInput.value = "";

        alertBox.innerHTML = "Please Enter A Valid City."
        alertBox.classList.remove("d-none");
    
        setTimeout(function(){
            alertBox.classList.add("d-none");
        }, 5000);
    
    }

}    

cityInput.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitButton.click();
    }
});


submitButton.addEventListener("click", getCity);



