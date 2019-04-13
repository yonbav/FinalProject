import React, { Component } from 'react';
import DailyBriefingView from './DailyBriefingView';

class EditDailyBriefing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let dailyBriefing = {
            image:"My File",
            title:"11/12/2018"
        }
        return <DailyBriefingView Title="Edit Daily Briefing"
            briefing={dailyBriefing} />
    }
}

export default EditDailyBriefing