import axios from "axios"



const getWeather = async (lat, lon) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=6aeac7ee03f61dca0326eedaa0224add`
    const req = await axios.get(URL)
    return req 
}

export default getWeather