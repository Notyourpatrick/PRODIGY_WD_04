const API_KEY = '6fdc0e1e81a306ce8bc5d9b849104395';
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const conditionIcon = document.createElement('i'); 

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('cityInput').value;

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    cityName.textContent = data.name;
                    temperature.textContent = `${data.main.temp} `;
                    
                    
                    const weatherCondition = data.weather[0].description.toLowerCase();
                    condition.textContent = weatherCondition;
                    conditionIcon.className = ''; 
                    if (weatherCondition.includes('smoky')) {
                        conditionIcon.classList.add('fas', 'fa-smog'); 
                    } else if (weatherCondition.includes('sunny') || weatherCondition.includes('clear')) {
                        conditionIcon.classList.add('fas', 'fa-sun'); 
                    } else if (weatherCondition.includes('cloudy')) {
                        conditionIcon.classList.add('fas', 'fa-cloud'); 
                    } else if (weatherCondition.includes('rain')) {
                        conditionIcon.classList.add('fas', 'fa-cloud-rain'); 
                    }
                    condition.appendChild(conditionIcon);

                    weatherInfo.style.display = 'block';
                } else {
                    alert('City not found. Please enter a valid city name.');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    } else {
        alert('Please enter a city name.');
    }
}