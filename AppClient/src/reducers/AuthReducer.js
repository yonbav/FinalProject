import {EMAIL_CHANGED, LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_USER} from "../../../ClientApp/src/Components/actions/types";
import {PASSWORD_CHANGED} from "../../../ClientApp/src/Components/actions/types";

const  INITIAL_STATE={email:'',password: '',success: '',error: '',loading: false, user:null}

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state,email:action.payload}
        case PASSWORD_CHANGED:
            return {...state,password:action.payload}
        case LOGIN_SUCCESS:
            return {...state,success: 'Login Success',error:'',loading:false,user: action.payload}
        case LOGIN_FAILED:
            return {...state,error: 'שם משתמש ו/או סיסמא שגוי/ים',success: '',loading:false}
        case LOGIN_USER:
            return {...state,error: '',loading:true,success:''}
        default:
            return state;
    }
}