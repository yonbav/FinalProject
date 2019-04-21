import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actionTypes';

import localStore from 'store'

const INIT_STATE = {
    authUser: localStore.get('user'),
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStore.set('user', action.payload);
            return {
                ...state,
                authUser: action.payload
            };
        case LOGOUT_SUCCESS:
            localStore.set('user', null);
            return {
                ...state,
                authUser: null
            };
        default:
            return state;
    }
}