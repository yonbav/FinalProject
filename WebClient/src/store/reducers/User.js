import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    ADD_USER_SUCCESS,
    EDIT_USER_SUCCESS,
    GET_ALL_USERS_SUCCESS,
    DELETE_USER_SUCCESS,
} from '../actionTypes';

import localStore from 'store'
import {isJsonValid} from '../../Utils/JsonUtils'

const initState = {
    loggedUser: isJsonValid(localStore.get('logged_user')) ? JSON.parse(localStore.get('logged_user')) : {},
    allUsersList: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStore.set('logged_user', JSON.stringify(action.user));
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
                allUsersList: [...state.allUsersList, action.newUser]
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                allUsersList: state.allUsersList.filter(user => user._id !== action.userId)
            };

        case EDIT_USER_SUCCESS:
            return {
                ...state,
                allUsersList: state.allUsersList.map(curUser => curUser._id === action.editedUser._id ? action.editedUser : curUser)
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