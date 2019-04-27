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
                dailyBriefingsList: [...state.dailyBriefingsList, action.newBriefing]
            };
        case DELETE_DAILY_BRIEFING_SUCCESS:
            return {
                ...state,
                dailyBriefingsList: state.dailyBriefingsList.filter(briefing => briefing._id !== action.briefingId)
            };

        case EDIT_DAILY_BRIEFING_SUCCESS:
            return {
                ...state,
                dailyBriefingsList: state.dailyBriefingsList.map(briefing => briefing._id === action.editedBriefing._id ? action.editedBriefing : briefing)
            };

        case GET_ALL_DAILY_BRIEFINGS_SUCCESS:
            return {
                ...state,
                dailyBriefingsList: action.allDailyBriefings
            };
        default:
            return state;
    }
}