import React, { Component } from 'react';
import ImprtantJobView from './JobView';
import { connect } from 'react-redux';
import {addJob} from '../../store/api'
import { showMessage, addJobSuccess, showFullLoader, hideFullLoader } from '../../store/actions/';

class AddJob extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.addNewJob = this.addNewJob.bind(this);
    }

    addNewJob(newJob) {
        this.props.showFullLoader();
        addJob(newJob, this.props.loggedUser.token).then(res => {
            // If failed to add the user
            if (res.status < 200 || res.status >=300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to add job.'
                })
                return;
            }

            this.props.addJobSuccess(newJob);

            this.props.showMessage({
                type: 'success',
                msg: 'Job was successfully added.'
            })
        })
        .catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to add job.'
            })
        })
        .finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        return <ImprtantJobView formTitle="Add Job"
            submitAction={this.addNewJob} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    return { loggedUser }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        addJobSuccess: (addedJob) => { dispatch(addJobSuccess(addedJob)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddJob)