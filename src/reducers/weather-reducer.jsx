import {
    TEST_API
} from '../actions/types';

const INITIAL_STATE = {
    artists: [],
    releases: [],
    shortlist: [],
    favoritesArtists: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TEST_API: {
            const data = action.payload.results.artistmatches.artist;
            return {...state, artists: data};
        }

        default:
            return state;
    }
};