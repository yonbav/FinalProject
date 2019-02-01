import {EMAIL_CHANGED, LOGIN_FAILED, LOGIN_SUCCESS,LOGIN_USER} from "./types";
import  {PASSWORD_CHANGED} from "./types";
import {Actions} from "react-native-router-flux";


export const emailChanged = (text) =>{
  return {
      type: EMAIL_CHANGED,
      payload: text
  };
};
export const passwordChanged = (text) =>{
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};
export const loginuser = (email,password) => {
    return(dispatch)=>
    {
        dispatch({type:LOGIN_USER});
        fetch('http://192.168.1.21:3000/get_birthdays',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                email: email,
                password: password,

            }),
        }).then((response)=> response.json())
            .then((res)=> {
                if(res.success === true)
                {
                    dispatch({type:LOGIN_SUCCESS,payload: res.user});
                    Actions.main(res.user);
                }
                else
                {
                    dispatch({type:LOGIN_FAILED})
                }
            })
    };
};
