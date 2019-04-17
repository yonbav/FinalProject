import {
    GET_ALL_CLIENTS_SUCCESS,
    LOAD_STORE_DATA_SUCCESS,
    LOAD_POS_CONFIG_SUCCESS,
    LOG_DISPLAY_PROPERTIES_SUCCESS,
} from '../actionTypes';

const INIT_STATE = {
    clientsData: null,
    logDisplayProperties: null
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CLIENTS_SUCCESS: {
            return {
                ...state,
                clientsData: action.payload
            }
        }
        case LOAD_STORE_DATA_SUCCESS: {
            return {
                ...state,
            }
        }
        case LOAD_POS_CONFIG_SUCCESS: {
            return {
                ...state,
            }
        }
        case LOG_DISPLAY_PROPERTIES_SUCCESS: {
            return {
                ...state,
                logDisplayProperties: action.payload
            }
        }
        default:
            return state;
    }
}
