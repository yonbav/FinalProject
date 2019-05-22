import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { defaultFilterMethod } from '../../Common';
import { deleteJob, getAllJobs } from '../../store/api';
import { getAllJobsSuccess, deleteJobSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class JobsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteJob = this.deleteJob.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();

        getAllJobs(this.props.loggedUser.token).then(res => {
            // If failed to get all jobs
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to get all jobs.'
                })
                return;
            }
            this.props.getAllJobsSuccess(res.data);
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to get all jobs.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    componentDidMount() {
        document.getElementById("JobTable").scrollIntoView();
    }

    deleteJob(jobId) {
        deleteJob({ _id: jobId }, this.props.loggedUser.token).then(res => {
            // If failed to edit the user
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to delete job.'
                })
                return;
            }

            this.props.deleteJobSuccess(jobId);
            this.props.showMessage({
                type: 'success',
                msg: 'job was deleted.'
            });
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to delete job.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        })
    }

    render() {
        const columns = [ {
            Header: 'Title',
            accessor: 'title',
            Cell: props => <div>{props.value}</div>
        }, {
            Header: 'Salary',
            accessor: 'number',
            Cell: props => <div>{props.value}</div>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '200',
            filterable: false,
            Cell: props => <Link to={"/Jobs/EditJob/" + props.value}>Edit</Link>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '200',
            filterable: false,
            Cell: props => <button onClick={() => this.deleteJob(props.value)} className="btn btn-link">Delete</button>
        }];

        return <div id="JobTable"><ReactTable filterable defaultFilterMethod={(filter, row) => defaultFilterMethod(filter, row)} defaultPageSize={10} className="react-table-default" data={this.props.jobsList} columns={columns} /></div>
    }
}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { jobsList } = state.jobs;
    return { jobsList, loggedUser };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllJobsSuccess: (allJobs) => { dispatch(getAllJobsSuccess(allJobs)) },
        deleteJobSuccess: (jobId) => { dispatch(deleteJobSuccess(jobId)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsList)