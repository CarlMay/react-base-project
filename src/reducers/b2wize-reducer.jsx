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
    // console.log('---reducer state', state);

    switch (action.type) {
        case GET_PRODUCT: {
            const data = action.payload;
            return {...state, productData: data};
        }

        case GET_PRODUCT_DETAIL: {
            // console.log('---reducer GET_PRODUCT_DETAIL payload', action);
            const data = action.payload;

            // console.log('---reducer GET_PRODUCT_DETAIL PartId', data['part_sales_data'][0].PartId);
            const partId = data['part_sales_data'][0].PartId;
            // const partData = {partId, [data['part_sales_data']]};
            // console.log('---reducer GET_PRODUCT_DETAIL partKey', partData);
            // console.log('---reducer GET_PRODUCT_DETAIL partData', partData);
            return {
                ...state,
                // productDetailData: partData
                // productDetailData: [
                //     ...state.productDetailData,
                //     {
                //         id: partId,
                //         ...data['part_sales_data'],
                //     }
                // ]

                productDetailData: {
                    ...state.productDetailData,
                    [partId]: {
                        ...state.productDetailData[partId],
                        // salesData: {
                        ...data['part_sales_data'],
                        // _attributes: {
                        //     ...notes[currentNoteId].data._attributes,
                        //     NoteWarningFlag: !notes[currentNoteId].data._attributes.NoteWarningFlag,
                        // },
                        // },
                    },
                },
            };
        }

        default:
            return state;
    }
};
