import {SIGNED_IN, SIGNED_OUT, CHANGE_LOADING_STATUS} from './types'


export const signedIn=()=>{
    return{
        type:SIGNED_IN,
    };
};
export const signedOut=()=>{

    return{
        type:SIGNED_OUT,
    };
}