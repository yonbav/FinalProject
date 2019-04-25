import {all} from 'redux-saga/effects';
// import monitorSaga from './Monitor';
// import statusSata from './Status';


export default function* rootSaga(getState) {
    yield all([
        // monitorSaga(),
        // statusSata(),
    ]);
}
