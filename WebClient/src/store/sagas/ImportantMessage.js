import { all, call, fork, put, takeEvery, take } from 'redux-saga/effects';
import { convertJsonToPatchString } from '../../Utils/JsonUtils'

import {
    ADD_IMPORTANT_MESSAGE,
    DELETE_IMPORTANT_MESSAGE,
    GET_ALL_IMPORTANT_MESSAGES,
    EDIT_IMPORTANT_MESSAGE,
} from '../actionTypes';

import {
    showFullLoader,
    hideFullLoader,
    showMessage,
    getAllImportantMessagesSuccess,
    deleteImportantMessageSuccess,
    editImportantMessageSuccess,
    addImportantMessageSuccess
} from '../actions';

import {
    getAllImportantMessages,
    addImportantMessage,
    deleteImportantMessage,
    editImportantMessage
} from '../api'

function* getAllImportantMessagesSaga() {
    try {
        yield put(showFullLoader())
        const response = yield call(getAllImportantMessages);
        yield put(getAllImportantMessagesSuccess(response));
    } catch (error) {
        console.log('[getAllImportantMessagesSaga]', error);
        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to get all ImportantMessages.",
        }));
    } finally {
        yield put(hideFullLoader());
    }
}

function* deleteImportantMessageSaga(ImportantMessageId) {
    try {
        yield put(showFullLoader())
        const response = yield call(deleteImportantMessage, {_id: ImportantMessageId}); 
        console.log("delete ImportantMessage respone: ", response);
        yield put(deleteImportantMessageSuccess(ImportantMessageId))
        yield put(showMessage({
            type: 'success',
            msg: "ImportantMessage was successfully deleted",
        }));
    }
    catch (error) {
        console.log('[deleteImportantMessagesSaga]', error);
        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to delete the ImportantMessage.",
        }));
    }
    finally {
        yield put(hideFullLoader())
    }
}

function* addImportantMessageSaga(newImportantMessage) {
    try {
        yield put(showFullLoader())
        const response = yield call(addImportantMessage, newImportantMessage); 
        yield put(addImportantMessageSuccess(newImportantMessage))
        console.log("add ImportantMessage respone: ", response);
        yield put(showMessage({
            type: 'success',
            msg: "ImportantMessage was successfully added",
        }));
    }
    catch (error){
        console.log('[addImportantMessagesSaga]', error)

        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to add the ImportantMessage.",
        }));
    }
    finally {
        yield put(hideFullLoader())
    }
}

function* editImportantMessageSaga(editedImportantMessage) {
    try {
        yield put(showFullLoader())
        let ImportantMessageString = convertJsonToPatchString(editedImportantMessage)
        const response = yield call(editImportantMessage, editedImportantMessage._id, ImportantMessageString);
        console.log("edit ImportantMessage respone: ", response);
        yield put(editImportantMessageSuccess(editedImportantMessage))
        yield put(showMessage({
            type: 'success',
            msg: "ImportantMessage was successfully edited",
        }));
    }
    catch (error){
        console.log('[editImportantMessagesSaga]', error)

        yield put(showMessage({
            type: 'error',
            msg: "Server Error. Failed to edit the ImportantMessage.",
        }));
    }
    finally {
        yield put(hideFullLoader())
    }
}

export function* getAllImportantMessagesDetect() {
    yield takeEvery(GET_ALL_IMPORTANT_MESSAGES, getAllImportantMessagesSaga);
}

export function* addImportantMessagesDetect() {
    const action = yield take(ADD_IMPORTANT_MESSAGE)
    yield takeEvery(ADD_IMPORTANT_MESSAGE, addImportantMessageSaga, action.newMessage);
}

export function* editImportantMessagesDetect() {
    const action = yield take(EDIT_IMPORTANT_MESSAGE)
    yield takeEvery(EDIT_IMPORTANT_MESSAGE, editImportantMessageSaga, action.editedMessage);
}

export function* deleteImportantMessagesDetect() {
    const action = yield take(DELETE_IMPORTANT_MESSAGE)
    yield takeEvery(DELETE_IMPORTANT_MESSAGE, deleteImportantMessageSaga, action.messageId);
}

export default function* rootSaga() {
    yield all([
        fork(getAllImportantMessagesDetect),
        fork(addImportantMessagesDetect),
        fork(editImportantMessagesDetect),
        fork(deleteImportantMessagesDetect),
    ]);
}