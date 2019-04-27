import {all} from 'redux-saga/effects';
import userSaga from './User';
import dailyBriefingSaga from './DailyBriefing';
import ImportantInfoSaga from './ImportantInfo';
import ImportantMessageSaga from './ImportantMessage';


export default function* rootSaga(getState) {
    yield all([
        userSaga(),
        dailyBriefingSaga(),
        ImportantInfoSaga(),
        ImportantMessageSaga(),
    ]);
}
