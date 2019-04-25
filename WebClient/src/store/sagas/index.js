import {all} from 'redux-saga/effects';
import userSaga from './User';
// import monitorSaga from './Monitor';
// import statusSata from './Status';


export default function* rootSaga(getState) {
    yield all([
        userSaga(),
        // monitorSaga(),
        // statusSata(),
    ]);
}
