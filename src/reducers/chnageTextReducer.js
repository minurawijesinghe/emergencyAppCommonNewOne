import {CHANGE,REMAKE} from '../actions/types';
export default(state ="hello World", action)=>{
    switch(action.type){
        case CHANGE:
            return state =action.payload;
        case REMAKE:
            return state = 'Text changed with redux reducer';
        default:
            return state;
    }
};
