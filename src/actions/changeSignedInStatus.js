import {SIGNED_IN, SIGNED_OUT, CHANGE_LOADING_STATUS, UPDATE_USER_LOCATION} from './types'


export const signedIn=()=>{
    return{
        type:SIGNED_IN,
    };
};
export const signedOut=()=>{

    return{
        type:SIGNED_OUT,
    };
};
export const locationUpdate=(latitude, longitude)=>{
    return{
        type:UPDATE_USER_LOCATION,
        latitude:latitude,
        longitude:longitude,
    };
}
