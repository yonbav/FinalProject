import { all, call, fork, put, takeEvery, take } from 'redux-saga/effects';
import { convertJsonToPatchString } from '../../Utils/JsonUtils'

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
    editUserSuccess,
    addUserSuccess
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

function* deleteUserSaga(userId) {
    try {
        yield put(showFullLoader())
        const response = yield call(deleteUser, {_id: userId}); 
        console.log("delete user respone: ", response);
        yield put(deleteUserSuccess(userId))
        yield put(showMessage({
            type: 'success',
            msg: "user was successfully deleted",
        }));
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

function* addUserSaga(newUser) {
    try {
        yield put(showFullLoader())
        const response = yield call(addUser, newUser); 
        yield put(addUserSuccess(response.data))
        console.log("add user respone: ", response);
        yield put(showMessage({
            type: 'success',
            msg: "user was successfully added",
        }));
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

function* editUserSaga(editedUser) {
    try {
        yield put(showFullLoader())
        let userString = convertJsonToPatchString(editedUser)
        const response = yield call(editUser, editedUser._id, userString);
        console.log("edit user respone: ", response);
        yield put(editUserSuccess(response.data))
        yield put(showMessage({
            type: 'success',
            msg: "user was successfully edited",
        }));
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
    const action = yield take(ADD_USER)
    yield takeEvery(ADD_USER, addUserSaga, action.newUser);
}

export function* editUsersDetect() {
    const action = yield take(EDIT_USER)
    yield takeEvery(EDIT_USER, editUserSaga, action.editedUser);
}

export function* deleteUsersDetect() {
    const action = yield take(DELETE_USER)
    yield takeEvery(DELETE_USER, deleteUserSaga, action.userId);
}


export default function* rootSaga() {
    yield all([
        fork(getAllUsersDetect),
        fork(addUsersDetect),
        fork(editUsersDetect),
        fork(deleteUsersDetect),
    ]);
}