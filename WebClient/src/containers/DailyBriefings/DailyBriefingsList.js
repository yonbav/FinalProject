import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getAllDailyBriefings, deleteDailyBriefing } from '../../store/actions'

class DailyBriefingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteDailyBriefing = this.deleteDailyBriefing.bind(this);
    }

    componentWillMount() {
        this.props.getAllDailyBriefings()
    }

    componentDidMount() {
        document.getElementById("dailyBreifingTable").scrollIntoView();
    }

    deleteDailyBriefing(dailyBriefingid) {
        this.props.deleteDailyBriefing(dailyBriefingid);
    }

    render() {
        const columns = [{
            Header: 'Date',
            accessor: 'title',
        }, {
            Header: 'File Name',
            accessor: 'image',
            Cell: props => <span className='number'>{props.value}</span>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            Cell: props => <Link to={"/DailyBriefings/EditDailyBriefing/" + props.value}>Edit</Link>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            Cell: props => <button onClick={() => this.deleteDailyBriefing(props.value)} className="btn btn-link">Delete</button>
        }];

        return <div id="dailyBreifingTable"><ReactTable defaultPageSize={10} className="react-table-default" data={this.props.dailyBriefingsList} columns={columns} /></div>
    }
}

const mapStateToProps = (state, ownProps) => {
    const { dailyBriefingsList } = state.briefings;
    return { dailyBriefingsList }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDailyBriefings: () => { dispatch(getAllDailyBriefings()) },
        deleteDailyBriefing: (briefingId) => { dispatch(deleteDailyBriefing(briefingId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyBriefingsList)