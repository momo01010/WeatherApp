import React, { useState, useEffect} from 'react'
import axios from 'axios'
import getWeather from './services/getWeather';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=6aeac7ee03f61dca0326eedaa0224add`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const position = (res) => {
    setLat(res.coords.latitude)
    setLon(res.coords.longitude)
  }
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)


//acá es otro codigo de la locación del ip

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState("");

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6aeac7ee03f61dca0326eedaa0224add`
      );
      setTemperature(res.data.main.temp);
      setCityName(res.data.name);
      setWeather(res.data.weather[0].main);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);




//acá es otro codigo










  useEffect(() => {

    navigator.geolocation.getCurrentPosition(position)

    getWeather(lat, lon)
     .then(res => {
       console.log(res.data)
       
     })
     .catch(err =>{
       console.log(err)
     })

  }, [lat, lon])




  return (
    <div className="app">



      

    <div className="app__container">
        <h1>{cityName}</h1>
        <h2>{temperature}ºC</h2>
        <h2>{weather}</h2>
      </div>




      

      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;
