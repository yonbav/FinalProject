import React, { Component } from 'react';
import ImprtantJobView from './JobView';
import { connect } from 'react-redux';
import { convertJsonToPatchString } from '../../Utils/JsonUtils';
import { editJob, getAllJobs } from '../../store/api';
import { showMessage, getAllJobsSuccess, editJobSuccess, showFullLoader, hideFullLoader } from '../../store/actions/';

class EditJob extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.editJob = this.editJob.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();
        getAllJobs(this.props.loggedUser.token).then(res => {
            // If failed to get all jobs
            if (res.status < 200 || res.status >= 300) {
                return;
            }
            this.props.getAllJobsSuccess(res.data);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    editJob(editedJob) {
        this.props.showFullLoader();
        let jobString = convertJsonToPatchString(editedJob)

        editJob(editedJob._id, jobString, this.props.loggedUser.token).then(res => {
            // If failed to edit the job
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to edit job.'
                })
                return;
            }

            this.props.editJobSuccess(editedJob);
            this.props.showMessage({
                type: 'success',
                msg: 'job was edited.'
            })
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to edit job.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        let jobToEdit = this.props.jobsList ? this.props.jobsList.find(job => job._id === this.props.match.params.id) : {};
        
        if (jobToEdit === undefined)
        {
            return <div>Error Occurred!</div>            
        }

        return <ImprtantJobView formTitle="Edit Job"
            job={jobToEdit}
            submitAction={this.editJob} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { jobsList } = state.jobs;
    return { jobsList, loggedUser }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllJobsSuccess: (allJobs) => { dispatch(getAllJobsSuccess(allJobs)) },
        editJobSuccess: (editedJob) => { dispatch(editJobSuccess(editedJob)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditJob);