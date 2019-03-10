import {ID_CHANGED, LOGIN_FAILED, LOGIN_SUCCESS,LOGIN_USER,CONECTTION_FAILED} from "./types";
import  {PASSWORD_CHANGED} from "./types";
import {Actions} from "react-native-router-flux";
import axios from 'axios'
import deviceStorage from '../../Services/deviceStorage'
export const idChanged = (text) =>{
  return {
      type: ID_CHANGED,
      payload: text
  };
};
export const passwordChanged = (text) =>{
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};
export const loginuser = (id,password) => {
    return(dispatch)=>
    {
        dispatch({type:LOGIN_USER});
        axios.post("http://192.168.1.32:3000/Auth/login",{
                id: id,
                password: password,
                authorization: '1'
        })
    .then((res)=> {
        res = res.data;
        if(res.success === true)
                {
                    dispatch({type:LOGIN_SUCCESS,payload: res.user});
                    Actions.main({type: 'reset',user:res.user});
                }
                else
                {
                    dispatch({type:LOGIN_FAILED})
                }
            }).catch(() => connectionFailed(dispatch))
    };
};
const connectionFailed =(dispatch) => {
  dispatch({type: CONECTTION_FAILED})
};
