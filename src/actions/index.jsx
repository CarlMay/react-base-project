import weather from '../apis/weather';

import {
    SEARCH_WEATHER
} from './types';

export const searchWeather = (searchText) => async (dispatch) => {

    console.log('---cityName', searchText);

    const key = 'b619015b36c4f505b5e8ae9c2cf8e46d';
    const {searchText:city} = searchText;

    const response = await weather.get(`?q=${city}&appid=${key}`);

    // console.log('---response', response);
    const data = response.data;


    dispatch({
        type: SEARCH_WEATHER,
        payload: data,
    });
};




