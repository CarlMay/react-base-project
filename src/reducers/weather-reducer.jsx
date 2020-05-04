import {
    SEARCH_WEATHER
} from '../actions/types';

const INITIAL_STATE = {
    weather: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_WEATHER: {
            const data = action.payload;
            return {...state, weather: data};
        }

        default:
            return state;
    }
};