import {combineReducers} from "redux";
import {reducer as formReducer}  from 'redux-form';
import weatherReducer from './weather-reducer';

export default combineReducers({
    weather: weatherReducer,
    form: formReducer,
});
