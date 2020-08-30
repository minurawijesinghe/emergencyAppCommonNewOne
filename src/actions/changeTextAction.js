import {CHANGE} from './types';
export const changeText=(receivedText)=>{

    return{
        type:CHANGE,
        payload: receivedText,
    };

}