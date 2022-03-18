const API_KEY= '66823ea3c401cdce12191b3b8b7675bb';

const fetchData = position => {

    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))

    console.log(position);
}


const setWeatherData = data => {
    console.log(data); 
    
    const weatherData = {
        location: data.name,
       /*  country: data.sys.country, */
        description: data.weather[0].description,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        feels_like: data.main.feels_like,
        icon: data.weather[0].icon,
        wind: data.wind.speed,
        sea_level: data.main.sea_level,
        //date: getDate(),

    }

    //DOM elements and set values to them
    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).innerHTML = weatherData[key];
    }
    )

    //------------- Get input value and search by city name  -----------
    let btnSearch = document.getElementById('btn-search');
    let cityName = document.getElementById('input');


    btnSearch.addEventListener('click', () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        console.log(data);
        
        console.log('cityName.value: ' + cityName.value);

        //Clean input
        cityName.value = '';

        localStorage.setItem('cityName', cityName.value);
        

    })




    //Weather icons
    let iconElement = document.getElementById('icon');

    if (weatherData.icon === '01d') {
        iconElement.setAttribute('src', '../Iconos/8-sun.png');
    }
    else if (weatherData.icon === '01n') {
        iconElement.setAttribute('src', '../Iconos/12-moonstars.png');
    }
    else if (weatherData.icon === '02d') {
        iconElement.setAttribute('src', '../Iconos/3cloudsandsun.png');
    }
    else if (weatherData.icon === '02n') {
        iconElement.setAttribute('src', '../Iconos/11-moonclouds.png');
    }
    else if (weatherData.icon === '03d' || weatherData.icon === '03n' || weatherData.icon === '04d' || weatherData.icon === '04n') {
        iconElement.setAttribute('src', '../Iconos/3clouds.png');
    }
    else if (weatherData.icon === '09d' || weatherData.icon === '09n' || weatherData.icon === '10d' || weatherData.icon === '10n') {
        iconElement.setAttribute('src', '../Iconos/7rain.png');
    }
    else if (weatherData.icon === '11d' || weatherData.icon === '11n') {
        iconElement.setAttribute('src', '../Iconos/5storm.png');
    }
    else if (weatherData.icon === '13d' || weatherData.icon === '13n') {
        iconElement.setAttribute('src', '../Iconos/snow.png');
    }
    else if (weatherData.icon === '50d' || weatherData.icon === '50n') {
        iconElement.setAttribute('src', '../Iconos/mist.png');
    }
    else {
        iconElement.setAttribute('src', `http://openweathermap.org/img/wn/${weatherData.icon}.png`);
    }


    function iniciarMap () {
        let coord = {lat:data.coord.lat, lng:data.coord.lon};
        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: coord
            });
    
        let marker = new google.maps.Marker({
            position: coord,
            map: map
            });
    }

    iniciarMap();
    

}



//Geolocation
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}

//Get date
const getDate = () => {
    const date = new Date();

    return `${date.getDate()}/${ ('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
}



let showOrHideMap = () => {
    let mapEl = document.getElementById('map');
    mapEl.classList.toggle('hidden');
    mapEl.classList.toggle('visible');

    let btnCloseMap = document.querySelector('.btn-close-map');
    btnCloseMap.classList.toggle('hidden');
    btnCloseMap.classList.toggle('visible');

    let btnOpenMap = document.querySelector('.btn-open-map');
    btnOpenMap.classList.toggle('hidden');
    btnOpenMap.classList.toggle('visible');

    console.log('--------------------------- Se está ejecutando showOrHideMap ---------------------------');
}

let btnOpenMap = document.querySelector('.btn-open-map');
btnOpenMap.addEventListener('click', showOrHideMap);

let btnCloseMap = document.querySelector('.btn-close-map');
btnCloseMap.addEventListener('click', showOrHideMap);

