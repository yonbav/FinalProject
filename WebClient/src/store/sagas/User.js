import { all, call, fork, put, takeEvery, take } from 'redux-saga/effects';

import {
    ADD_USER,
    DELETE_USER,
    GET_ALL_USERS,
    EDIT_USER,
} from '../actionTypes';

import {
    showFullLoader,
    hideFullLoader,
    showMessage,
    getAllUsersSuccess,
    deleteUserSuccess,
    editUserSuccess
} from '../actions';

import {
    getAllUsers,
    addUser,
    deleteUser,
    editUser
} from '../api'

function* getAllUsersSaga() {
    try {
        yield put(showFullLoader())
        const response = yield call(getAllUsers);
        yield put(getAllUsersSuccess(response.user));
    } catch (error) {
        console.log('[getAllUsersSaga]', error);
        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to get all users.",
        }));
    } finally {
        yield put(hideFullLoader());
    }
}

function* deleteUserSage(userId) {
    try {
        yield put(showFullLoader())
        const response = yield call(deleteUser, {_id: userId}); 
        console.log("delete user respone: ", response);
        yield put(deleteUserSuccess(userId))
    }
    catch (error) {
        console.log('[deleteUsersSaga]', error);
        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to delete the user.",
        }));
    }
    finally {
        yield put(hideFullLoader())
    }
}

function* addUserSaga() {
    try {
        yield put(showFullLoader())
        const response = yield call(addUser); 
        yield put(deleteUserSuccess(response.data))
    }
    catch (error){
        console.log('[addUsersSaga]', error)

        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to add the user.",
        }));
    }
    finally {
        yield put(hideFullLoader())
    }
}

function* editUserSage() {
    try {
        yield put(showFullLoader())
        const response = yield call(editUser);
        yield put(editUserSuccess(response.data))
    }
    catch (error){
        console.log('[editUsersSaga]', error)

        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to edit the user.",
        }));
    }
    finally {
        yield put(hideFullLoader())
    }
}

export function* getAllUsersDetect() {
    yield takeEvery(GET_ALL_USERS, getAllUsersSaga);
}

export function* addUsersDetect() {
    yield takeEvery(ADD_USER, addUserSaga);
}

export function* editUsersDetect() {
    yield takeEvery(EDIT_USER, editUserSage);
}

export function* deleteUsersDetect() {
    const action = yield take(DELETE_USER)
    yield takeEvery(DELETE_USER, deleteUserSage, action.userId);
}


export default function* rootSaga() {
    yield all([
        fork(getAllUsersDetect),
        fork(addUsersDetect),
        fork(editUsersDetect),
        fork(deleteUsersDetect),
    ]);
}