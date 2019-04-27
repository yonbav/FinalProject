import {    
    ADD_DAILY_BRIEFING,
    ADD_DAILY_BRIEFING_SUCCESS,
    EDIT_DAILY_BRIEFING,
    EDIT_DAILY_BRIEFING_SUCCESS,
    GET_ALL_DAILY_BRIEFINGS,
    GET_ALL_DAILY_BRIEFINGS_SUCCESS,
    DELETE_DAILY_BRIEFING,
    DELETE_DAILY_BRIEFING_SUCCESS,
} from '../actionTypes';

// Delete daily briefing

export const deleteDailyBriefing = (DailyBriefingId) => {
    return {
        type: DELETE_DAILY_BRIEFING,
        DailyBriefingId,
    };
}
export const deleteDailyBriefingSuccess = (DailyBriefingId) => {
    return {
        type: DELETE_DAILY_BRIEFING_SUCCESS,
        DailyBriefingId,
    };
};

// Add daily briefing

export const addDailyBriefing = (newDailyBriefing) => {
    return {
        type: ADD_DAILY_BRIEFING, 
        newDailyBriefing,
    };
};
export const addDailyBriefingSuccess = (newDailyBriefing) => {
    
    return {
        type: ADD_DAILY_BRIEFING_SUCCESS, 
        newDailyBriefing,
    };
};

// Edit daily briefing

export const editDailyBriefing = (editedDailyBriefing) => {
    return {
        type: EDIT_DAILY_BRIEFING, 
        editedDailyBriefing,
    };
};

export const editDailyBriefingSuccess = (editedDailyBriefing) => {
    return {
        type: EDIT_DAILY_BRIEFING_SUCCESS,
        editedDailyBriefing,
    };
};

// Get all daily briefings

export const getAllDailyBriefings = () => {
    return {
        type: GET_ALL_DAILY_BRIEFINGS
    };
};

export const getAllDailyBriefingsSuccess = (allDailyBriefings) => {
    return {
        type: GET_ALL_DAILY_BRIEFINGS_SUCCESS, 
        allDailyBriefings,
    };
};

