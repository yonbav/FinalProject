import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { defaultFilterMethod, Constants } from '../../Common';
import { deleteDailyBriefing, getAllDailyBriefings } from '../../store/api';
import { getAllDailyBriefingsSuccess, deleteDailyBriefingSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class DailyBriefingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteDailyBriefing = this.deleteDailyBriefing.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();
        getAllDailyBriefings(this.props.loggedUser.token).then(res => {
            // If failed to get all daily briefings
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to get all brieifngs.'
                })
            }
            this.props.getAllDailyBriefingsSuccess(res.data);
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to get all brieifngs.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    componentDidMount() {
        document.getElementById("dailyBreifingTable").scrollIntoView();
    }

    deleteDailyBriefing(dailyBriefingid) {
        this.props.showFullLoader();
        deleteDailyBriefing({ _id: dailyBriefingid }, this.props.loggedUser.token).then(res => {
            // If failed to edit the user
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to delete briefing.'
                })
                return;
            }

            this.props.deleteDailyBriefingSuccess(dailyBriefingid);
            this.props.showMessage({
                type: 'success',
                msg: 'briefing was deleted.'
            });
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to delete briefing.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        })
    }

    render() {
        const columns = [{
            Header: 'Title',
            accessor: 'title',
            Cell: props => <Link to={"/readby/DailyBriefing/" + props.original._id}>{props.value}</Link>
        }, {
            Header: 'File Name',
            accessor: 'image',
            Cell: props => <a href={`${Constants.SERVER_URL}${Constants.PDF_FOLDER_NAME}${props.value}`}>{props.value}</a>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            filterable: false,
            Cell: props => <Link to={"/DailyBriefings/EditDailyBriefing/" + props.value}>Edit</Link>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            filterable: false,
            Cell: props => <button onClick={() => this.deleteDailyBriefing(props.value)} className="btn btn-link">Delete</button>
        }];

        return <div id="dailyBreifingTable"><ReactTable filterable defaultFilterMethod={(filter, row) => defaultFilterMethod(filter, row)} defaultPageSize={10} className="react-table-default" data={this.props.dailyBriefingsList} columns={columns} /></div>
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
        deleteDailyBriefingSuccess: (briefingId) => { dispatch(deleteDailyBriefingSuccess(briefingId)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyBriefingsList)