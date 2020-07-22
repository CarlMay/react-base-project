import {
    GET_PRODUCT,
    GET_PRODUCT_DETAIL
} from '../actions/types';

const INITIAL_STATE = {
    productData: [],
    productDetailData: [],
    partData: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCT: {
            const data = action.payload;
            return {...state, productData: data};
        }

        case GET_PRODUCT_DETAIL: {
            const data = action.payload;
            const partId = data['part_sales_data'][0].PartId;

            return {
                ...state,
                productDetailData: {
                    ...state.productDetailData,
                    [partId]: {
                        ...state.productDetailData[partId],
                        ...data['part_sales_data'],
                    },
                },
            };
        }

        default:
            return state;
    }
};
