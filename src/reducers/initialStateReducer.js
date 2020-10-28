import {SIGNED_IN, SIGNED_OUT, UPDATE_USER_LOCATION} from '../actions/types';
const initialState = {
    SIGNED_IN:false,
    SIGNED_OUT:true,
    loading:true,
    latitude:0,
    longitude:0,
}

export default(state=initialState,action)=>{
    switch(action.type){
        case SIGNED_IN:
            return {...state,SIGNED_IN :true};
        case SIGNED_OUT:
            return {...state,SIGNED_IN :false};
        case UPDATE_USER_LOCATION:
            return {...state, latitude:action.latitude, longitude:action.longitude};
        default:
            return state;
    }
}