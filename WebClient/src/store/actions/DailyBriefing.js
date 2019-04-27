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

export const deleteDailyBriefing = (briefingId) => {
    return {
        type: DELETE_DAILY_BRIEFING,
        briefingId,
    };
}
export const deleteDailyBriefingSuccess = (briefingId) => {
    return {
        type: DELETE_DAILY_BRIEFING_SUCCESS,
        briefingId,
    };
};

// Add daily briefing

export const addDailyBriefing = (newBriefing) => {
    return {
        type: ADD_DAILY_BRIEFING, 
        newBriefing,
    };
};
export const addDailyBriefingSuccess = (newBriefing) => {
    
    return {
        type: ADD_DAILY_BRIEFING_SUCCESS, 
        newBriefing,
    };
};

// Edit daily briefing

export const editDailyBriefing = (editedBriefing) => {
    return {
        type: EDIT_DAILY_BRIEFING, 
        editedBriefing,
    };
};

export const editDailyBriefingSuccess = (editedBriefing) => {
    return {
        type: EDIT_DAILY_BRIEFING_SUCCESS,
        editedBriefing,
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

