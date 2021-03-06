import React, { Component } from 'react';
import DailyBriefingView from './DailyBriefingView';
import { connect } from 'react-redux';
import { addDailyBriefing } from '../../store/api';
import {convertJsonToFormData} from '../../Utils/JsonUtils';
import { addDailyBriefingSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class AddDailyBriefing extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.addNewDailyBriefing = this.addNewDailyBriefing.bind(this);
    }

    addNewDailyBriefing(newBriefing) {
        this.props.showFullLoader();
        var formDataBrieifing = convertJsonToFormData(newBriefing);
        addDailyBriefing(formDataBrieifing, this.props.loggedUser.token).then(res => {
            // If failed to add the user
            if (res.status < 200 || res.status >=300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to add briefing.'
                })
                return;
            }

            this.props.addDailyBriefingSuccess(newBriefing);

            this.props.showMessage({
                type: 'success',
                msg: 'briefing was successfully added.'
            })
        })
        .catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to add briefing.'
            })
        })
        .finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        return <DailyBriefingView Title="Add Daily Briefing"
            submitAction={this.addNewDailyBriefing} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const {loggedUser} = state.users
    const {dailyBriefingsList} = state.users
    return {loggedUser, dailyBriefingsList};
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        addDailyBriefingSuccess: (newBriefing) => { dispatch(addDailyBriefingSuccess(newBriefing)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDailyBriefing);