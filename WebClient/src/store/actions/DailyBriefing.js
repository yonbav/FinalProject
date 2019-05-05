import {    
    ADD_DAILY_BRIEFING_SUCCESS,
    EDIT_DAILY_BRIEFING_SUCCESS,
    GET_ALL_DAILY_BRIEFINGS_SUCCESS,
    DELETE_DAILY_BRIEFING_SUCCESS,
} from '../actionTypes';

export const deleteDailyBriefingSuccess = (briefingId) => {
    return {
        type: DELETE_DAILY_BRIEFING_SUCCESS,
        briefingId,
    };
};

export const addDailyBriefingSuccess = (newBriefing) => {
    
    return {
        type: ADD_DAILY_BRIEFING_SUCCESS, 
        newBriefing,
    };
};

export const editDailyBriefingSuccess = (editedBriefing) => {
    return {
        type: EDIT_DAILY_BRIEFING_SUCCESS,
        editedBriefing,
    };
};

export const getAllDailyBriefingsSuccess = (allDailyBriefings) => {
    return {
        type: GET_ALL_DAILY_BRIEFINGS_SUCCESS, 
        allDailyBriefings,
    };
};

