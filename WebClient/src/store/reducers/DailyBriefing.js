import {
    ADD_DAILY_BRIEFING_SUCCESS,
    EDIT_DAILY_BRIEFING_SUCCESS,
    GET_ALL_DAILY_BRIEFINGS_SUCCESS,
    DELETE_DAILY_BRIEFING_SUCCESS,
} from '../actionTypes';

const initState = {
};

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_DAILY_BRIEFING_SUCCESS:
            return {
                ...state,
                dailyBriefingsList: [...state.dailyBriefingsList, action.newInfo]
            };
        case DELETE_DAILY_BRIEFING_SUCCESS:
            return {
                ...state,
                dailyBriefingsList: state.dailyBriefingsList.filter(info => info._id !== action.infoId)
            };

        case EDIT_DAILY_BRIEFING_SUCCESS:
            return {
                ...state,
                dailyBriefingsList: state.dailyBriefingsList.map(info => info._id === action.editedInfo._id ? action.editedInfo : info)
            };

        case GET_ALL_DAILY_BRIEFINGS_SUCCESS:
            return {
                ...state,
                dailyBriefingsList: action.allbriefings
            };
        default:
            return state;
    }
}