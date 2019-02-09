import {ID_CHANGED, LOGIN_FAILED, LOGIN_SUCCESS,LOGIN_USER,CONECTTION_FAILED} from "./types";
import  {PASSWORD_CHANGED} from "./types";
import {Actions} from "react-native-router-flux";


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
        fetch('http://192.168.1.27:3000/get_birthdays',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                id: id,
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
            }).catch(() => connectionFailed(dispatch))
    };
};
const connectionFailed =(dispatch) => {
  dispatch({type: CONECTTION_FAILED})
};
