import {    
    ADD_JOB_SUCCESS,
    EDIT_JOB_SUCCESS,
    GET_ALL_JOBS_SUCCESS,
    DELETE_JOB_SUCCESS,
} from '../actionTypes';

export const deleteJobSuccess = (jobId) => {
    return {
        type: DELETE_JOB_SUCCESS,
        jobId,
    };
};

export const addJobSuccess = (newJob) => {
    
    return {
        type: ADD_JOB_SUCCESS, 
        newJob,
    };
};

export const editJobSuccess = (editedJob) => {
    return {
        type: EDIT_JOB_SUCCESS,
        editedJob,
    };
};

export const getAllJobsSuccess = (allJobs) => {
    return {
        type: GET_ALL_JOBS_SUCCESS, 
        allJobs,
    };
};

