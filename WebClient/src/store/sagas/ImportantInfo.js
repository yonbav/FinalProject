import { all, call, fork, put, takeEvery, take } from 'redux-saga/effects';
import { convertJsonToPatchString } from '../../Utils/JsonUtils'

import {
    EDIT_IMPORTANT_INFO,
    GET_ALL_IMPORTANT_INFO,
} from '../actionTypes';

import {
    showFullLoader,
    hideFullLoader,
    showMessage,
    getAllImportantInfoSuccess,
    editImportantInfoSuccess,
} from '../actions';

import {
    getAllImportantInfo,
    editImportantInfo
} from '../api'

function* getAllImportantInfoSaga() {
    try {
        yield put(showFullLoader())
        const response = yield call(getAllImportantInfo);
        yield put(getAllImportantInfoSuccess(response));
    } catch (error) {
        console.log('[getAllImportantInfoSaga]', error);
        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to get all ImportantInfo.",
        }));
    } finally {
        yield put(hideFullLoader());
    }
}

function* editImportantInfoSaga(editedImportantInfo) {
    try {
        yield put(showFullLoader())
        let ImportantInfoString = convertJsonToPatchString(editedImportantInfo)
        const response = yield call(editImportantInfo, editedImportantInfo._id, ImportantInfoString);
        console.log("edit ImportantInfo respone: ", response);
        yield put(editImportantInfoSuccess(editedImportantInfo))
        yield put(showMessage({
            type: 'success',
            msg: "ImportantInfo was successfully edited",
        }));
    }
    catch (error){
        console.log('[editImportantInfosSaga]', error)

        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to edit the ImportantInfo.",
        }));
    }
    finally {
        yield put(hideFullLoader())
    }
}

export function* getAllImportantInfoDetect() {
    yield takeEvery(GET_ALL_IMPORTANT_INFO, getAllImportantInfoSaga);
}

export function* editImportantInfoDetect() {
    const action = yield take(EDIT_IMPORTANT_INFO)
    yield takeEvery(EDIT_IMPORTANT_INFO, editImportantInfoSaga, action.editedImportantInfo);
}

export default function* rootSaga() {
    yield all([
        fork(getAllImportantInfoDetect),
        fork(editImportantInfoDetect),
    ]);
}