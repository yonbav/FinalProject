import React, {Component} from 'react';
import DailyBriefingView from './DailyBriefingView';

class EditDailyBriefing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <DailyBriefingView Title="Edit Daily Briefing"
        FileName="My File"
        DailyBriefingDate="11/12/2018"/>
    }
}

export default EditDailyBriefing