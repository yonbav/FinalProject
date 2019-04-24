import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import moment from 'moment';

import {
    GET_BUSINESSDAY,
    GET_OPENHOURS,
    GET_EMPLOYEECOUNT,
    GET_VERSION,
    GET_STORE_STATUS,
    GET_STORE_NAME,
} from '../actionTypes';


import {
    getBusinessDaySuccess,
    getStoreStatusSuccess,
    getOpenHoursSuccess,
    getEmployeeCountSuccess,
    getVersionSuccess,
    getStoreNameSuccess,
    showMessage,
} from '../actions';


import {
    getBusinessDay,
    getStoreStatus,
    getOpenHours,
    getEmployeeCount,
    getVersion,
    getStoreName,
} from '../api'

import {Constants} from '../../Common'

function* getBusinessDaySaga() {
    try {
        const response = yield call(getBusinessDay);
        if (response.ErrorCode === 0){
            yield put(getBusinessDaySuccess(moment(response.BusinessDate, 'DD/MM/YYYY').toDate()));
        }else{
            yield put(getBusinessDaySuccess("20/12/2018"));
            yield put (showMessage({
                type: 'error',
                msg: Constants.ERROR_MESSAGES[response.ErrorCode],
            }));
        }
    } catch (error) {
        console.log('getBusinessDaySaga', error);
        yield put(showMessage({
            type: 'error',
            msg: Constants.INTERAL_ERROR_MESSAGE,
        }));
    }
}

function* getStoreStatusSaga() {
    try {
        const response = yield call(getStoreStatus);
        if (response.ErrorCode === 0){
            if (response.StoreStatus === 1){
                yield put(getStoreStatusSuccess("Close"));
            }else if (response.StoreStatus === 3){
                yield put(getStoreStatusSuccess("Open"));
            }
        }else{
            yield put(getStoreStatusSuccess("---"));
            yield put (showMessage({
                type: 'error',
                msg: Constants.ERROR_MESSAGES[response.ErrorCode],
            }));
        }
    } catch (error) {
        console.log('getStoreStatusSaga', error);
        yield put(showMessage({
            type: 'error',
            msg: Constants.INTERAL_ERROR_MESSAGE,
        }));
    }
}

function* getOpenHoursSaga() {
    try {
        const response = yield call(getOpenHours);
        if (response.ErrorCode === 0){
            yield put(getOpenHoursSuccess({
                OpenTime: moment(response.WorkHours.OpenTime).format('HH:mm'),
                CloseTime: moment(response.WorkHours.CloseTime).format('HH:mm'),
            }));
        }else{
            yield put(getOpenHoursSuccess({
                OpenTime: '--:--',
                CloseTime: '--:--',
            }));
            yield put (showMessage({
                type: 'error',
                msg: Constants.ERROR_MESSAGES[response.ErrorCode],
            }));
        }
    } catch (error) {
        console.log('getOpenHoursSaga', error);
        yield put(showMessage({
            type: 'error',
            msg: Constants.INTERAL_ERROR_MESSAGE,
        }));
    }
}

function* getEmployeeCountSaga() {
    try {
        const response = yield call(getEmployeeCount);
        if (response.ErrorCode === 0){
            yield put(getEmployeeCountSuccess(response.ClockedEmployees));
        }else{
            yield put(getEmployeeCountSuccess(null));
            yield put (showMessage({
                type: 'error',
                msg: Constants.ERROR_MESSAGES[response.ErrorCode],
            }));
        }
    } catch (error) {
        console.log('getEmployeeCountSaga', error);
        yield put(showMessage({
            type: 'error',
            msg: Constants.INTERAL_ERROR_MESSAGE,
        }));
    }
}

function* getVersionSaga() {
    try {
        const response = yield call(getVersion);
        yield put(getVersionSuccess(response.Version));
    } catch (error) {
        console.log('getVersionSaga', error);
        yield put(showMessage({
            type: 'error',
            msg: Constants.INTERAL_ERROR_MESSAGE,
        }));
    }
}

function* getStoreNameSaga()
{
    try {
        const response = yield call(getStoreName);
        yield put(getStoreNameSuccess(response.StoreName));
    } catch (error) {
        console.log('getStoreNameSaga', error);
        yield  put(showMessage({
            type:'error',
            msg: Constants.INTERAL_ERROR_MESSAGE
        }))
    }
}


export function* getBusinessDayDetect() {
    yield takeEvery(GET_BUSINESSDAY, getBusinessDaySaga);
}
export function* getStoreStatusDetect() {
    yield takeEvery(GET_STORE_STATUS, getStoreStatusSaga);
}
export function* getOpenHoursDetect() {
    yield takeEvery(GET_OPENHOURS, getOpenHoursSaga);
}
export function* getEmployeeCountDetect() {
    yield takeEvery(GET_EMPLOYEECOUNT, getEmployeeCountSaga);
}
export function* getStoreNameDetect() {
    yield takeEvery(GET_STORE_NAME, getStoreNameSaga);
}
export function* getVersionDetect() {
    yield takeEvery(GET_VERSION, getVersionSaga);
}
export default function* rootSaga() {
    yield all([
        fork(getBusinessDayDetect),
        fork(getStoreStatusDetect),
        fork(getOpenHoursDetect),
        fork(getEmployeeCountDetect),
        fork(getVersionDetect),
        fork(getStoreNameDetect)
    ]);
}