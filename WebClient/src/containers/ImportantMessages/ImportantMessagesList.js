import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getAllImportantMessages, deleteImportantMessage } from '../../store/actions'

class ImportantMessagesList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteImportantMessage = this.deleteImportantMessage.bind(this);
    }

    componentWillMount() {
        this.props.getAllImportantMessages();
    }

    componentDidMount() {
        document.getElementById("ImportantMessageTable").scrollIntoView();
    }

    deleteImportantMessage(importantMessageId) {
        this.props.deleteImportantMessage(importantMessageId);
    }

    render() {
        const columns = [{
            Header: 'Title',
            maxWidth: '300',
            accessor: 'title',
        }, {
            Header: 'Content',
            accessor: 'contect',
            Cell: props => <div style={{ textAlign: "left" }}>{props.value}</div>
        }, {
            Header: 'Link',
            accessor: 'link',
            Cell: props => <div style={{ textAlign: "left" }}>{props.value}</div>
        }, {
            Header: 'created Date',
            accessor: 'createdtime',
            maxWidth: '300'
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            Cell: props => <Link to={"/ImportantMessages/EditImportantMessage/" + props.value}>Edit</Link>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            Cell: props => <button onClick={() => this.deleteImportantMessage(props.value)} className="btn btn-link">Delete</button>
        }];

        return <div id="ImportantMessageTable"><ReactTable defaultPageSize={10} className="react-table-default" data={this.props.importantMessagesList} columns={columns} /></div>
    }
}

const mapStateToProps = (state, ownProps) => {
    const { importantMessagesList } = state.messages;
    return { importantMessagesList };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllImportantMessages: () => { dispatch(getAllImportantMessages()) },
        deleteImportantMessage: (messageId) => { dispatch(deleteImportantMessage(messageId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportantMessagesList)