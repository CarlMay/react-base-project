import b2wize from '../apis/b2wize';

import {
    GET_PRODUCT,
    GET_PRODUCT_DETAIL,
} from './types';



export const getProduct = () => async (dispatch) => {
    const response = await b2wize.get('list');
    const data = response.data;

    dispatch({
        type: GET_PRODUCT,
        payload: data,
    });
};

export const getProductDetail = (partId) => async (dispatch) => {

    // https://n61jo6k2hb.execute-api.us-east-1.amazonaws.com/dev/parts/sales_data/part_id/2

    const response = await b2wize.get(`sales_data?part_id=${partId}`);
    const data = response.data;

    dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: data,
    });
};


