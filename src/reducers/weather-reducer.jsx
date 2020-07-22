import {
    SEARCH_WEATHER
} from '../actions/types';

const INITIAL_STATE = {
    weatherData: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_WEATHER: {
            const data = action.payload;
            return {...state, weatherData: data};
        }

        default:
            return state;
    }
};