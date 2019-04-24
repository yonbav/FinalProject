import {Constants} from "../Common";

export function getTextStyle(data, mainKey) {
    if (typeof data === 'object'){
        if(Constants.ERROR_TEXTS.indexOf(data[mainKey]) > -1){
            return 'red';
        }else if (Constants.GOOD_TEXTS.indexOf(data[mainKey]) > -1 ){
            return 'green';
        }else{
            return 'black';
        }
    }else{
        if(Constants.ERROR_TEXTS.indexOf(data) > -1){
            return 'red';
        }else if (Constants.GOOD_TEXTS.indexOf(data) > -1 ){
            return 'green';
        }else{
            return 'black';
        }
    }
};