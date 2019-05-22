import { combineReducers } from 'redux';
import Ui from './Ui';
import User from './User';
import Message from './ImportantMessage';
import Briefing from './DailyBriefing';
import Info from './ImportantInfo';
import Link from './LinkItem';
import Minhal from './Minhal';


const reducers = combineReducers ({
    users: User,
    ui: Ui,
    messages: Message,
    briefings: Briefing,
    info: Info,
    links: Link,
    minhals: Minhal,
});

export default reducers;
