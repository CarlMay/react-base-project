import b2wize from '../apis/b2wize';
import weather from '../apis/weather';

import {
    GET_PRODUCT,
    GET_PRODUCT_DETAIL,
    SEARCH_WEATHER,
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

    // console.log('---getProduct');
    const response = await b2wize.get('list');
    //
    // console.log('---response', response);
    const data = response.data;


    dispatch({
        type: GET_PRODUCT,
        payload: data,
    });
};

export const getProductDetail = (partId) => async (dispatch) => {

    // console.log('---getProductDetail', partId);
    // https://n61jo6k2hb.execute-api.us-east-1.amazonaws.com/dev/parts/sales_data/part_id/2

    const response = await b2wize.get(`sales_data?part_id=${partId}`);
    //
    // console.log('---response', response);
    const data = response.data;


    dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: data,
    });
};


