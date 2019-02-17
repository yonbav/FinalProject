import { combineReducers } from 'redux';
import Ui from './Ui';
import User from './User';
import Status from './Status';
import Monitor from './Monitor';


const reducers = combineReducers ({
    user: User,
    ui: Ui,
    status: Status,
    monitor: Monitor,
});

export default reducers;
