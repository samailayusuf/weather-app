function fetchWeatherData() {
    const location = document.querySelector('#city-name').value;

    const reportSection = document.querySelector('.report');
    const forecastSection = document.querySelector('.forecast');
    const dayAfterNextSection = document.querySelector('.day-after-next');
    const nextDaySetion = document.querySelector('.next-day');
    const loaderSection = document.querySelector('.loader');

    loaderSection.style.visibility = "visible";
    

    if(!location) {
        
        loaderSection.innerHTML = "<h3>No Data returned!</h3>";
        setTimeout(() => {
            loaderSection.style.visibility = "hidden";
        }, 3000);
        
        return false;
       
    }

    loaderSection.innerHTML = "<h3>Loading...</h3>";
    //Grabbing the UI elements for same day report
    console.log(loaderSection.innerHTML);
    const city = document.querySelector('#city');
    const condition = document.querySelector('#condition');
    const temperature = document.querySelector('#temperature');
    const imageContainer = document.querySelector('#image');

    //Grabbing UI elements for the 1st day forecast
    const forecastCity = document.querySelector('#next-city');
    const forecastCondition = document.querySelector('#next-condition');
    const forecastTemperature = document.querySelector('#next-temperature');
    const forecastImageContainer = document.querySelector('#next-image');

    //Grabbing UI for second day forecast
    const nextForecastCity = document.querySelector('#next-forecast-city');
    const nextForecastCondition = document.querySelector('#next-forecast-condition');
    const nextForecastTemperature = document.querySelector('#next-forecast-temperature');
    const nextForecastImageContainer = document.querySelector('#next-forecast-image');
    //console.log('clicked');
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=1f88145fbe2e4e788aa101132210110&q=${location}&days=3&aqi=no&alerts=no`).
    then(response =>{

        const conditionText = response.data.current.condition.text;
        const temperatureData = response.data.current.temp_c + ' <span>&#8451</span>';
        const location = response.data.location.name +", "+response.data.location.country;
        const image = response.data.current.condition.icon;

        //Getting 1st day forecast from the api
        const forecastCondtionText = response.data.forecast.forecastday[1].day.condition.text;
        const forecastTemp = `Min: ${response.data.forecast.forecastday[1].day.mintemp_c} <span>&#8451</span> and Max: ${response.data.forecast.forecastday[1].day.maxtemp_c} <span>&#8451</span>` ;
        const forecastIcon = response.data.forecast.forecastday[1].day.condition.icon;

        //Getting data for second day forecast from api
        const nextForecastCondtionText = response.data.forecast.forecastday[2].day.condition.text;
        const nextForecastTemp = `Min: ${response.data.forecast.forecastday[2].day.mintemp_c} <span>&#8451</span> and Max: ${response.data.forecast.forecastday[1].day.maxtemp_c} <span>&#8451</span>` ;
        const nextForecastIcon = response.data.forecast.forecastday[2].day.condition.icon;



        //Inserting data for 1st day forecast from API into UI elements
        forecastCity.innerHTML = location;
        forecastCondition.innerHTML = forecastCondtionText;
        forecastTemperature.innerHTML = forecastTemp;
        forecastImageContainer.innerHTML = `<img src=${forecastIcon} />`;

        //Inserting API data into forecast second day UI elements
        nextForecastCity.innerHTML = location;
        nextForecastCondition.innerHTML = nextForecastCondtionText;
        nextForecastTemperature.innerHTML = nextForecastTemp;
        nextForecastImageContainer.innerHTML = `<img src=${nextForecastIcon} />`;


        
        //Same day's weather report 
        console.log(forecastCondtionText);
        city.innerHTML = location;
        condition.innerText = conditionText;
        temperature.innerHTML = temperatureData;
        imageContainer. innerHTML = `<img src=${image} />`;

        loaderSection.style.visibility = "hidden";
        reportSection.style.visibility = "visible";
        forecastSection.style.visibility = "visible";
        dayAfterNextSection.style.visibility = "visible";
        nextDaySetion.style.visibility = "visible";

    })
    .catch(err =>{
        console.log(err);
        loaderSection.innerHTML = err ? `<h3>Location Not Found</h3>` : '';
        
        setTimeout(()=> loaderSection.style.visibility = "hidden", 3000)
        
    })//Promise is used to handle async operation
}