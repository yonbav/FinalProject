// import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

// import moment from 'moment';

// import {
//     GET_ALL_CLIENTS, 
//     LOAD_STORE_DATA,
//     LOAD_POS_CONFIG,
//     LOG_DISPLAY_PROPERTIES,
// } from '../actionTypes';


// import {
//     showMessage,
//     hideFullLoader,
//     getAllClientsSuccess,
//     loadStoreDataSuccess,
//     loadPosConfigSuccess,
//     getAllClient,
//     logDisplayPropertiesSuccess,
//     setStoreDataDate,
//     setPosConfigDate,
//     showIndicator,
//     hideIndicator,
// } from '../actions';


// import {
//     getAllClients,
//     loadStoreData,
//     loadPosConfig,
//     logDisplayProperties,
// } from '../api'

// import {Constants} from '../../Common'

// function* getAllClientsSaga() {
//     try {
//         const response = yield call(getAllClients);
//         yield put(getAllClientsSuccess(response.ClientsDataList));
//     } catch (error) {
//         console.log('getAllClients_saga', error);
//         yield put(hideFullLoader());
//         yield put(showMessage({
//             type: 'error',
//             msg: "Server Error. Please check server status.",
//         }));
//     }
// }

// function* loadStoreDataSaga() {
//     try {
//         yield put(showIndicator());
//         yield put(setStoreDataDate('Loading...'));
//         const response = yield call(loadStoreData);
//         yield put(hideIndicator());
//         if (response){
//             yield put(loadStoreDataSuccess(response));
//             yield put(setStoreDataDate(moment().format('DD/MM/YYYY HH:mm')));
//         }
//     } catch (error) {
//         yield put(hideIndicator());
//         yield put(setStoreDataDate("error"));
//         console.log('loadStoreData_saga', error);
//         yield put(showMessage({
//             type: 'error',
//             msg: Constants.INTERAL_ERROR_MESSAGE,
//         }));
//     }
// }

// function* loadPosConfigSaga() {
//     try {
//         yield put(showIndicator());
//         yield put(setPosConfigDate('Loading...'));
//         const response = yield call(loadPosConfig);
//         yield put(hideIndicator());
//         if (response){
//             yield put(loadPosConfigSuccess(response));
//             yield put(setPosConfigDate(moment().format('DD/MM/YYYY HH:mm')));
//             yield put(getAllClient())
//         }
//     } catch (error) {
//         yield put(hideIndicator());
//         yield put(setPosConfigDate("error"));
//         console.log('loadPosConfig_Saga', error);
//         yield put(showMessage({
//             type: 'error',
//             msg: Constants.INTERAL_ERROR_MESSAGE,
//         }));
//     }
// }

// function* logDisplayPropertiesSaga() {
//     try {
//         const response = yield call(logDisplayProperties);
//         if (response.ErrorCode === 0){
//             yield put(logDisplayPropertiesSuccess({
//                 FileName: response.FileName, 
//                 DateFormat: response.DateFormat,
//             }));
//         }else{
//             yield put (showMessage({
//                 type: 'error',
//                 msg: Constants.ERROR_MESSAGES[response.ErrorCode],
//             }));
//         }
//     } catch (error) {
//         console.log('logDisplayProperties_Saga', error);
//         yield put(showMessage({
//             type: 'error',
//             msg: Constants.INTERAL_ERROR_MESSAGE,
//         }));
//     }
// }



// export function* getAllClientsDetect() {
//     yield takeEvery(GET_ALL_CLIENTS, getAllClientsSaga);
// }

// export function* loadStoreDataDetect() {
//     yield takeEvery(LOAD_STORE_DATA, loadStoreDataSaga);
// }

// export function* loadPosConfigDetect() {
//     yield takeEvery(LOAD_POS_CONFIG, loadPosConfigSaga);
// }

// export function* logDisplayPropertiesDetect() {
//     yield takeEvery(LOG_DISPLAY_PROPERTIES, logDisplayPropertiesSaga);
// }


// export default function* rootSaga() {
//     yield all([
//         fork(getAllClientsDetect),
//         fork(loadStoreDataDetect),
//         fork(loadPosConfigDetect),
//         fork(logDisplayPropertiesDetect),
//     ]);
// }