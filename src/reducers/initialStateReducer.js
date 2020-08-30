import {SIGNED_IN, SIGNED_OUT} from '../actions/types';
const initialState = {
    SIGNED_IN:false,
    SIGNED_OUT:true,
    loading:true,
}

export default(state=initialState,action)=>{
    switch(action.type){
        case SIGNED_IN:
            return {...state,SIGNED_IN :true};
        case SIGNED_OUT:
            return {...state,SIGNED_IN :false};
        default:
            return state;
    }
}