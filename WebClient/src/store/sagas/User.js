import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    ADD_USER,
    DELETE_USER,
    GET_ALL_USERS,
    EDIT_USER,
} from '../actionTypes';

import {
    showFullLoader,
    hideFullLoader,
    showIndicator,
    hideIndicator,
    showMessage,
    hideMessage,
    getAllUsersSuccess
} from '../actions';

import {
    getAllUsers,
    addUser,
    deleteUsers,
    editUsers
} from '../api'

function* getAllUsersSaga() {
    try {
        yield put(showFullLoader())
        const response = yield call(getAllUsers);
        yield put(getAllUsersSuccess(response.user));
    } catch (error) {
        console.log('getAllUsersSaga', error);
        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to get all users.",
        }));
    } finally {
        yield put(hideFullLoader());
    }
}

export function* getAllUsersDetect() {
    yield takeEvery(GET_ALL_USERS, getAllUsersSaga);
}

export function* addUsersDetect() {
    yield takeEvery(ADD_USER, getAllUsersSaga);
}

export function* editUsersDetect() {
    yield takeEvery(DELETE_USER, getAllUsersSaga);
}

export function* deleteUsersDetect() {
    yield takeEvery(EDIT_USER, getAllUsersSaga);
}


export default function* rootSaga() {
    yield all([
        fork(getAllUsersDetect),
        fork(addUsersDetect),
        fork(editUsersDetect),
        fork(deleteUsersDetect),
    ]);
}