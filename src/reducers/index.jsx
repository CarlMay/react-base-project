import {combineReducers} from "redux";
import {reducer as formReducer}  from 'redux-form';
// import mindzReducer from './mindz-reducer';
// import lastFmReducer from './last-fm-reducer';
import weatherReducer from './weather-reducer';

export default combineReducers({
    // mindz: mindzReducer,
    // lastFm: lastFmReducer,
    weather: weatherReducer,
    form: formReducer,
});