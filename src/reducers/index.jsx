import {combineReducers} from "redux";
import {reducer as formReducer}  from 'redux-form';
import weatherReducer from './weather-reducer';
import productReducer from './b2wize-reducer';

export default combineReducers({
    weather: weatherReducer,
    product: productReducer,
    form: formReducer,
});