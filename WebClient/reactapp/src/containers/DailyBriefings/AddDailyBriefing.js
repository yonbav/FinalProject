import React, {Component} from 'react';
import DailyBriefingView from './DailyBriefingView';

class AddDailyBriefing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <DailyBriefingView Title="Add Daily Briefing"/>
    }
}

export default AddDailyBriefing