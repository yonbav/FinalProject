import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    ADD_USER_SUCCESS,
    EDIT_USER_SUCCESS,
    GET_ALL_USERS_SUCCESS,
    DELETE_USER_SUCCESS,
} from '../actionTypes';

import localStore from 'store'

const initState = {
    user: {
        loggedUser: localStore.get('logged_user'),
        allUsersList: []
    }
};


export default (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStore.set('logged_user', action.user);
            return {
                ...state,
                loggedUser: action.user
            };
        case LOGOUT_SUCCESS:
            localStore.set('logged_user', null);
            return {
                ...state,
                loggedUser: null
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
            };

        case EDIT_USER_SUCCESS:
            return {
                ...state,
            };

        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                allUsersList: action.allUsers
            };
        default:
            return state;
    }
}