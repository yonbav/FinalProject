import {
    EDIT_IMPORTANT_INFO_SUCCESS,
    GET_ALL_IMPORTANT_INFO_SUCCESS,
} from '../actionTypes';

const initState = {
};

export default (state = initState, action) => {
    switch (action.type) {
        case EDIT_IMPORTANT_INFO_SUCCESS:
            return {
                ...state,
                importantInfoList: state.importantInfoList.map(info => info._id === action.editedInfo._id ? action.editedInfo : info)
            };

        case GET_ALL_IMPORTANT_INFO_SUCCESS:
            return {
                ...state,
                importantInfoList: action.allInfoList
            };
        default:
            return state;
    }
}