import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { defaultFilterMethod } from '../../Common';
import { deleteImportantMessage, getAllImportantMessages } from '../../store/api';
import { getAllImportantMessagesSuccess, deleteImportantMessageSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class ImportantMessagesList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteImportantMessage = this.deleteImportantMessage.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();

        getAllImportantMessages(this.props.loggedUser.token).then(res => {
            // If failed to get all messages
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to get all messages.'
                })
                return;
            }
            this.props.getAllImportantMessagesSuccess(res.data);
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to get all messages.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    componentDidMount() {
        document.getElementById("ImportantMessageTable").scrollIntoView();
    }

    deleteImportantMessage(importantMessageId) {
        deleteImportantMessage({ _id: importantMessageId }, this.props.loggedUser.token).then(res => {
            // If failed to edit the user
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to delete message.'
                })
                return;
            }

            this.props.deleteImportantMessageSuccess(importantMessageId);
            this.props.showMessage({
                type: 'success',
                msg: 'message was deleted.'
            });
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to delete message.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        })
    }

    render() {
        const columns = [ {
            Header: 'Title',
            accessor: 'title',
            maxWidth: '300',
            Cell: props => <Link to={"/readby/ImportantMessage/" + props.original._id}>{props.value}</Link>
        }, {
            Header: 'Content',
            accessor: 'contect',
            Cell: props => <div style={{ textAlign: "right" }}>{props.value}</div>
        }, {
            Header: 'Link',
            accessor: 'link',
            Cell: props => <a href={props.value} style={{ textAlign: "right" }}>{props.value}</a>
        }, {
            Header: 'created Date',
            accessor: 'createdtime',
            maxWidth: '300'
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            filterable: false,
            Cell: props => <Link to={"/ImportantMessages/EditImportantMessage/" + props.value}>Edit</Link>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            filterable: false,
            Cell: props => <button onClick={() => this.deleteImportantMessage(props.value)} className="btn btn-link">Delete</button>
        }];

        return <div id="ImportantMessageTable"><ReactTable filterable defaultFilterMethod={(filter, row) => defaultFilterMethod(filter, row)} defaultPageSize={10} className="react-table-default" data={this.props.importantMessagesList} columns={columns} /></div>
    }
}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { importantMessagesList } = state.messages;
    return { importantMessagesList, loggedUser };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllImportantMessagesSuccess: (allMessages) => { dispatch(getAllImportantMessagesSuccess(allMessages)) },
        deleteImportantMessageSuccess: (messageId) => { dispatch(deleteImportantMessageSuccess(messageId)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportantMessagesList)