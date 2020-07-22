import {combineReducers} from "redux";
import {reducer as formReducer}  from 'redux-form';
import productReducer from './b2wize-reducer';

export default combineReducers({
    product: productReducer,
    form: formReducer,
});
