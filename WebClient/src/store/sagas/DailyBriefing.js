import { all, call, fork, put, takeEvery, take } from 'redux-saga/effects';
import { convertJsonToPatchString } from '../../Utils/JsonUtils'

import {
    ADD_DAILY_BRIEFING,
    DELETE_DAILY_BRIEFING,
    GET_ALL_DAILY_BRIEFINGS,
    EDIT_DAILY_BRIEFING,
} from '../actionTypes';

import {
    showFullLoader,
    hideFullLoader,
    showMessage,
    getAllDailyBriefingsSuccess,
    deleteDailyBriefingSuccess,
    editDailyBriefingSuccess,
    addDailyBriefingSuccess
} from '../actions';

import {
    getAllDailyBriefings,
    addDailyBriefing,
    deleteDailyBriefing,
    editDailyBriefing
} from '../api'

function* getAllDailyBriefingsSaga() {
    try {
        yield put(showFullLoader())
        const response = yield call(getAllDailyBriefings);
        yield put(getAllDailyBriefingsSuccess(response));
    } catch (error) {
        console.log('[getAllDailyBriefingsSaga]', error);
        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to get all DailyBriefings.",
        }));
    } finally {
        yield put(hideFullLoader());
    }
}

function* deleteDailyBriefingSaga(DailyBriefingId) {
    try {
        yield put(showFullLoader())
        const response = yield call(deleteDailyBriefing, {_id: DailyBriefingId}); 
        console.log("delete DailyBriefing respone: ", response);
        yield put(deleteDailyBriefingSuccess(DailyBriefingId))
        yield put(showMessage({
            type: 'success',
            msg: "DailyBriefing was successfully deleted",
        }));
    }
    catch (error) {
        console.log('[deleteDailyBriefingsSaga]', error);
        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to delete the DailyBriefing.",
        }));
    }
    finally {
        yield put(hideFullLoader())
    }
}

function* addDailyBriefingSaga(newDailyBriefing) {
    try {
        yield put(showFullLoader())
        const response = yield call(addDailyBriefing, newDailyBriefing); 
        yield put(addDailyBriefingSuccess(newDailyBriefing))
        console.log("add DailyBriefing respone: ", response);
        yield put(showMessage({
            type: 'success',
            msg: "DailyBriefing was successfully added",
        }));
    }
    catch (error){
        console.log('[addDailyBriefingsSaga]', error)

        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to add the DailyBriefing.",
        }));
    }
    finally {
        yield put(hideFullLoader())
    }
}

function* editDailyBriefingSaga(editedDailyBriefing) {
    try {
        yield put(showFullLoader())
        let DailyBriefingString = convertJsonToPatchString(editedDailyBriefing)
        const response = yield call(editDailyBriefing, editedDailyBriefing._id, DailyBriefingString);
        console.log("edit DailyBriefing respone: ", response);
        yield put(editDailyBriefingSuccess(editedDailyBriefing))
        yield put(showMessage({
            type: 'success',
            msg: "DailyBriefing was successfully edited",
        }));
    }
    catch (error){
        console.log('[editDailyBriefingsSaga]', error)

        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to edit the DailyBriefing.",
        }));
    }
    finally {
        yield put(hideFullLoader())
    }
}

export function* getAllDailyBriefingsDetect() {
    yield takeEvery(GET_ALL_DAILY_BRIEFINGS, getAllDailyBriefingsSaga);
}

export function* addDailyBriefingsDetect() {
    const action = yield take(ADD_DAILY_BRIEFING)
    yield takeEvery(ADD_DAILY_BRIEFING, addDailyBriefingSaga, action.newDailyBriefing);
}

export function* editDailyBriefingsDetect() {
    const action = yield take(EDIT_DAILY_BRIEFING)
    yield takeEvery(EDIT_DAILY_BRIEFING, editDailyBriefingSaga, action.editedDailyBriefing);
}

export function* deleteDailyBriefingsDetect() {
    const action = yield take(DELETE_DAILY_BRIEFING)
    yield takeEvery(DELETE_DAILY_BRIEFING, deleteDailyBriefingSaga, action.DailyBriefingId);
}

export default function* rootSaga() {
    yield all([
        fork(getAllDailyBriefingsDetect),
        fork(addDailyBriefingsDetect),
        fork(editDailyBriefingsDetect),
        fork(deleteDailyBriefingsDetect),
    ]);
}