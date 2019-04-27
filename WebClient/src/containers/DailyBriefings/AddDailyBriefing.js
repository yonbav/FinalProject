import React, { Component } from 'react';
import DailyBriefingView from './DailyBriefingView';
import { connect } from 'react-redux';
import { addDailyBriefing } from '../../store/actions';

class AddDailyBriefing extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.addNewDailyBriefing = this.addNewDailyBriefing.bind(this);
    }

    addNewDailyBriefing(newBriefing) {
        this.props.addDailyBriefing(newBriefing)
    }

    render() {
        return <DailyBriefingView Title="Add Daily Briefing"
            submitAction={this.addNewDailyBriefing} />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDailyBriefing: (newBriefing) => { dispatch(addDailyBriefing(newBriefing)) },
    }
}

export default connect(null, mapDispatchToProps)(AddDailyBriefing);