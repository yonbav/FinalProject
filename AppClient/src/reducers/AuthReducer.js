import {EMAIL_CHANGED, LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_USER,CONECTTION_FAILED} from "../../src/Components/actions/types";
import {PASSWORD_CHANGED} from "../../src/Components/actions/types";

const  INITIAL_STATE={email:'',password: '',success: '',error: '',loading: false, user:null,errorConn: ''};

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state,email:action.payload,errorConn: ''};
        case PASSWORD_CHANGED:
            return {...state,password:action.payload,errorConn: ''};
        case LOGIN_SUCCESS:
            return {...state,success: 'Login Success',error:'',loading:false,user: action.payload,errorConn: ''};
        case LOGIN_FAILED:
            return {...state,error: "שם משתמש ו/או סיסמא שגוי/ים",success: '',loading:false,errorConn: ''};
        case LOGIN_USER:
            return {...state,error: '',loading:true,success:'',errorConn: ''};
        case CONECTTION_FAILED:
            return {...state,errorConn: 'אין חיבור לרשת אנא נסה שנית.',loading:false,success:'',error:''};
        default:
            return state;
    }
}