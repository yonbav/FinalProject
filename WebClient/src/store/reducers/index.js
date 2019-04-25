import { combineReducers } from 'redux';
import Ui from './Ui';
import User from './User';


const reducers = combineReducers ({
    users: User,
    ui: Ui,
});

export default reducers;
