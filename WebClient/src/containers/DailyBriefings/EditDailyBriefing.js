import React, { Component } from 'react';
import DailyBriefingView from './DailyBriefingView';
import { connect } from 'react-redux';
import { convertJsonToPatchString } from '../../Utils/JsonUtils';
import { editDailyBriefing, getAllDailyBriefings } from '../../store/api';
import { getAllDailyBriefingsSuccess, editDailyBriefingSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class EditDailyBriefing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.editDailyBriefing = this.editDailyBriefing.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();
        getAllDailyBriefings(this.props.loggedUser.token).then(res => {
            // If failed to get all messages
            if (res.status < 200 || res.status >= 300) {
                return;
            }
            this.props.getAllDailyBriefingsSuccess(res.data);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    editDailyBriefing(editedBriefing) {
        this.props.showFullLoader();
        let briefingString = convertJsonToPatchString(editedBriefing)

        editDailyBriefing(editedBriefing._id, briefingString, this.props.loggedUser.token).then(res => {
            // If failed to edit the briefing
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to edit briefing.'
                })
                return;
            }

            this.props.editDailyBriefingSuccess(editedBriefing);
            this.props.showMessage({
                type: 'success',
                msg: 'briefing was edited.'
            })
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to edit briefing.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        let dailyBriefing = this.props.dailyBriefingsList ? this.props.dailyBriefingsList.find(brief => brief._id === this.props.match.params.id) : {};
        return <DailyBriefingView Title="Edit Daily Briefing"
            briefing={dailyBriefing}
            submitAction={this.editDailyBriefing} />
    }
}


const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { dailyBriefingsList } = state.briefings;
    return { dailyBriefingsList, loggedUser };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllDailyBriefingsSuccess: (allBriefings) => { dispatch(getAllDailyBriefingsSuccess(allBriefings)) },
        editDailyBriefingSuccess: (editedBriefing) => { dispatch(editDailyBriefingSuccess(editedBriefing)) },
        showMessage: (typ, msg) => { dispatch(showMessage(typ, msg)) },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditDailyBriefing)