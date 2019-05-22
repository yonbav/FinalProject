import {
    ADD_MINHAL_SUCCESS,
    EDIT_MINHAL_SUCCESS,
    GET_ALL_MINHALS_SUCCESS,
    DELETE_MINHAL_SUCCESS,
} from '../actionTypes';

const initState = {
    minhalsList: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_MINHAL_SUCCESS:
            return {
                ...state,
                minhalsList: [...state.minhalsList, action.newMinhal]
            };
        case DELETE_MINHAL_SUCCESS:
            return {
                ...state,
                minhalsList: state.minhalsList.filter(minhal => minhal._id !== action.minhalId)
            };

        case EDIT_MINHAL_SUCCESS:
            return {
                ...state,
                minhalsList: state.minhalsList.map(minhal => minhal._id === action.editedMinhal._id ? action.editedMinhal : minhal)
            };

        case GET_ALL_MINHALS_SUCCESS:
            return {
                ...state,
                minhalsList: action.allMinhals
            };
        default:
            return state;
    }
}