import { combineReducers} from 'redux';
import changeTextReducer from './chnageTextReducer';
import  initialStateReducer from './initialStateReducer';

export default combineReducers({
    changeText: changeTextReducer,
    initialState: initialStateReducer,
});