import {ID_CHANGED, LOGIN_FAILED, LOGIN_SUCCESS,LOGIN_USER,CONECTTION_FAILED} from "./types";
import  {PASSWORD_CHANGED} from "./types";
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
export const loginuser = (id,password,navigation ) => {
    return(dispatch)=>
    {
        dispatch({type:LOGIN_USER});
        axios.post("http://185.56.74.46:3000/Auth/login",{
            id: id,
            password: password,
            authorization: '1'
        })
            .then((res)=> {
                res = res.data;
                if(res.success === true)
                {
                    deviceStorage.saveKey("id_token", res.user.token);
                    dispatch({type:LOGIN_SUCCESS,payload: res.user});
                    navigation.navigate("SignedIn",{user:res.user})
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