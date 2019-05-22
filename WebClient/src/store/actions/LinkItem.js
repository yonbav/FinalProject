import {    
    ADD_LINK_ITEM_SUCCESS,
    EDIT_LINK_ITEM_SUCCESS,
    GET_ALL_LINK_ITEMS_SUCCESS,
    DELETE_LINK_ITEM_SUCCESS,
} from '../actionTypes';

export const addLinkItemSuccess = (newLink) => {
    
    return {
        type: ADD_LINK_ITEM_SUCCESS, 
        newLink,
    };
}; 

export const editLinkItemSuccess = (editedLink) => {
    return {
        type: EDIT_LINK_ITEM_SUCCESS, 
        editedLink,
    };
};

export const getAllLinkItemsSuccess = (allLinks) => {
    return {
        type: GET_ALL_LINK_ITEMS_SUCCESS, 
        allLinks,
    };
};

export const deleteLinkItemSuccess = (linkId) => {
    return {
        type: DELETE_LINK_ITEM_SUCCESS,
        linkId,
    };
};

