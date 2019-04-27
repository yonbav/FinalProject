import React, { Component } from 'react';
import DailyBriefingView from './DailyBriefingView';
import { connect } from 'react-redux';
import {getAllDailyBriefings, editDailyBriefing} from '../../store/actions'

class EditDailyBriefing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.editDailyBriefing = this.editDailyBriefing.bind(this);
    }

    componentWillMount() {
        this.props.getAllDailyBriefings();
    }

    editDailyBriefing(editedBriefing) {
        this.props.editDailyBriefing(editedBriefing);
    }

    render() {
        let dailyBriefing = this.props.dailyBriefingsList.find(brief => brief._id === this.props.match.params.id)
        return <DailyBriefingView Title="Edit Daily Briefing"
            briefing={dailyBriefing}
            submitAction={this.editDailyBriefing} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const { dailyBriefingsList } = state.briefings;
    return { dailyBriefingsList }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDailyBriefings: () => { dispatch(getAllDailyBriefings()) },
        editDailyBriefing: (editedBriefing) => { dispatch(editDailyBriefing(editedBriefing)) },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditDailyBriefing)