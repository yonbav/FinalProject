import {
    ADD_LINK_ITEM_SUCCESS,
    EDIT_LINK_ITEM_SUCCESS,
    GET_ALL_LINK_ITEMS_SUCCESS,
    DELETE_LINK_ITEM_SUCCESS,
} from '../actionTypes';

const initState = {
    linkItemsList:[],
};

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_LINK_ITEM_SUCCESS:
            return {
                ...state,
                linkItemsList: [...state.linkItemsList, action.newLink]
            };
        case DELETE_LINK_ITEM_SUCCESS:
            return {
                ...state,
                linkItemsList: state.linkItemsList.filter(link => link._id !== action.linkId)
            };

        case EDIT_LINK_ITEM_SUCCESS:
            return {
                ...state,
                linkItemsList: state.linkItemsList.map(link => link._id === action.editedLink._id ? action.editedLink : link)
            };

        case GET_ALL_LINK_ITEMS_SUCCESS:
            return {
                ...state,
                linkItemsList: action.allLinks
            };
        default:
            return state;
    }
}