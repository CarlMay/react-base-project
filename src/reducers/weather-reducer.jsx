import {
    SEARCH_WEATHER
} from '../actions/types';

const INITIAL_STATE = {
    artists: [],
    releases: [],
    shortlist: [],
    favoritesArtists: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_WEATHER: {
            const data = action.payload.results.artistmatches.artist;
            return {...state, artists: data};
        }

        default:
            return state;
    }
};