import {SIGNED_IN, SIGNED_OUT, CHANGE_LOADING_STATUS, UPDATE_USER_LOCATION, UPDATE_TOKEN, UPDATE_OFFICER_ID} from './types'


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
};
export const updateToken =( token )=>{
    return{
        type:UPDATE_TOKEN,
        token:token,
    };
};
export const updateOfficerId =(officerId)=>{
    return{
        type:UPDATE_OFFICER_ID,
        officerId:officerId,
    };
};
