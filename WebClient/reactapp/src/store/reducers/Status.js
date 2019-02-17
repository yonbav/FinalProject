import {
    GET_BUSINESSDAY_SUCCESS,
    GET_STORE_STATUS_SUCCESS,
    GET_OPENHOURS_SUCCESS,
    GET_EMPLOYEECOUNT_SUCCESS,
    GET_VERSION_SUCCESS,
    GET_STORE_NAME_SUCCESS,
    SET_POSCONFIGDATE,
    SET_STOREDATA_DATE
} from '../actionTypes';

const INIT_STATE = {
    businessDay: "--/--/----",
    storeStatus: "--",
    openHours: {
        OpenTime: "--:--",
        CloseTime: "--:--"
    },
    employeeCount: null,
    posConfigDate: "--/--/---- --:--",
    prevPosConfigDate: "--/--/---- --:--",
    errorPosConfig: false,
    storeDataDate: "--/--/---- --:--",
    prevStoreDataDate: "--/--/---- --:--",
    errorStoreData: false,
    version: "",
    storeName: ""
};


export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case GET_BUSINESSDAY_SUCCESS: {
            return {
                ...state,
                businessDay: action.payload
            }
        }
        case GET_STORE_STATUS_SUCCESS: {
            return {
                ...state,
                storeStatus: action.payload
            }
        }
        case GET_OPENHOURS_SUCCESS: {
            return {
                ...state,
                openHours: action.payload
            }
        }
        case GET_EMPLOYEECOUNT_SUCCESS: {
            return {
                ...state,
                employeeCount: action.payload
            }
        }
        case GET_VERSION_SUCCESS: {
            return {
                ...state,
                version: action.payload
            }
        }
        case GET_STORE_NAME_SUCCESS: {
            return {
                ...state,
                storeName: action.payload
            }
        }
        case SET_POSCONFIGDATE: {
            if (action.payload.toLowerCase() === "error"){
                return {
                    ...state,
                    errorPosConfig: true,
                    posConfigDate: state.prevPosConfigDate
                }    
            }
            if (action.payload.toLowerCase() === "loading..."){
                return {
                    ...state,
                    prevPosConfigDate: state.posConfigDate,
                    posConfigDate: action.payload,
                    errorPosConfig: false,
                }    
            }
            return {
                ...state,
                posConfigDate: action.payload,
                errorPosConfig: false,
            }
        }
        case SET_STOREDATA_DATE: {
            if (action.payload === "error"){
                return {
                    ...state,
                    errorStoreData: true,
                    storeDataDate: state.prevStoreDataDate
                }    
            }
            if (action.payload.toLowerCase() === "loading..."){
                return {
                    ...state,
                    prevStoreDataDate: state.storeDataDate,
                    storeDataDate: action.payload,
                    errorStoreData: false,
                }    
            }
            return {
                ...state,
                storeDataDate: action.payload,
                errorStoreData: false,
            }
        }
        default:
            return state;
    }
}
