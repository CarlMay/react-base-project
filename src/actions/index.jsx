import b2wize from '../apis/b2wize';
import weather from '../apis/weather';

import {
    GET_PRODUCT, SEARCH_WEATHER
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


export const getProduct = () => async (dispatch) => {

    console.log('---getProduct');

    // const key = 'b619015b36c4f505b5e8ae9c2cf8e46d';
    // const {searchText:city} = searchText;
    //
    const response = await b2wize.get('parts/list');
    //
    console.log('---response', response);
    const data = response.data;
    // const data = "responseDataTxt";



    dispatch({
        type: GET_PRODUCT,
        payload: data,
    });
};


