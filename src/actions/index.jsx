import weather from '../apis/weather';

import {
    SEARCH_WEATHER
} from './types';

export const searchWeather = (artistId) => async (dispatch) => {
    const response = await weather.get(`release/?query=arid:${artistId}`);
    const SearchResults = {
        [artistId]: response.data.releases,
    };

    dispatch({
        type: SEARCH_WEATHER,
        payload: SearchResults,
    });
};


