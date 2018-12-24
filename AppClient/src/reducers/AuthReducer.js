import {EMAIL_CHANGED, LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_USER} from "../Components/actions/types";
import {PASSWORD_CHANGED} from "../Components/actions/types";

const  INITIAL_STATE={email:'',password: '',success: '',error: '',loading: false}

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state,email:action.payload}
        case PASSWORD_CHANGED:
            return {...state,password:action.payload}
        case LOGIN_SUCCESS:
            return {...state,success: 'Login Success',error:'',loading:false}
        case LOGIN_FAILED:
            return {...state,error: 'Login Failed',success: '',loading:false}
        case LOGIN_USER:
            return {...state,error: '',loading:true,success:''}
        default:
            return state;
    }
}