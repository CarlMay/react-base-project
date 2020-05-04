import weather from '../apis/weather';

import {
    SEARCH_WEATHER
} from './types';

export const searchWeather = (searchText) => async (dispatch) => {

    console.log('---cityName', searchText);

    const options = {
        headers: {
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
            'x-rapidapi-key': '42de42f217msha532c4a0d2de233p115e07jsn94d3837a8a31',
        }
    };

    // const response = await weather.get(`?q=${searchText}&id=2172797`, options);
    const response = await weather.get(`?callback=test&id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=London%252Cuk`, options);

    console.log('---response', response);
    const data = response.data;


    dispatch({
        type: SEARCH_WEATHER,
        payload: data,
    });
};


