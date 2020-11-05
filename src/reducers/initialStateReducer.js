import {SIGNED_IN, SIGNED_OUT, UPDATE_USER_LOCATION, UPDATE_TOKEN, UPDATE_OFFICER_ID} from '../actions/types';
const initialState = {
    SIGNED_IN:false,
    SIGNED_OUT:true,
    loading:true,
    latitude:0,
    longitude:0,
    token:'',
    officerId:'',
}

export default(state=initialState,action)=>{
    switch(action.type){
        case SIGNED_IN:
            return {...state,SIGNED_IN :true};
        case SIGNED_OUT:
            return {...state,SIGNED_IN :false};
        case UPDATE_USER_LOCATION:
            return {...state, latitude:action.latitude, longitude:action.longitude};
        case UPDATE_TOKEN:
            return {...state, token:action.token};
        case UPDATE_OFFICER_ID:
            return {...state, officerId:action.officerId};
        default:
            return state;
    }
}