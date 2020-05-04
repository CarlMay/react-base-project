import axios from 'axios';

export default axios.create({
    baseURL: 'https://community-open-weather-map.p.rapidapi.com/weather',
});