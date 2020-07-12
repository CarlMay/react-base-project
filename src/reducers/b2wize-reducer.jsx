import {
    GET_PRODUCT
} from '../actions/types';

const INITIAL_STATE = {
    productData: [],
};

export default (state = INITIAL_STATE, action) => {
    // console.log('---reducer state', state);
    // console.log('---reducer action.payload', action.payload);

    switch (action.type) {
        case GET_PRODUCT: {
            const data = action.payload;
            return {...state, productData: data};
        }

        default:
            return state;
    }
};