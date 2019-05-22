import {
    ADD_JOB_SUCCESS,
    EDIT_JOB_SUCCESS,
    GET_ALL_JOBS_SUCCESS,
    DELETE_JOB_SUCCESS,
} from '../actionTypes';

const initState = {
    jobsList: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_JOB_SUCCESS:
            return {
                ...state,
                jobsList: [...state.jobsList, action.newJob]
            };
        case DELETE_JOB_SUCCESS:
            return {
                ...state,
                jobsList: state.jobsList.filter(job => job._id !== action.jobId)
            };

        case EDIT_JOB_SUCCESS:
            return {
                ...state,
                jobsList: state.jobsList.map(job => job._id === action.editedJob._id ? action.editedJob : job)
            };

        case GET_ALL_JOBS_SUCCESS:
            return {
                ...state,
                jobsList: action.allJobs
            };
        default:
            return state;
    }
}