import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { defaultFilterMethod } from '../../Common';
import { deleteLinkItem, getAllLinkItems } from '../../store/api';
import { getAllLinkItemsSuccess, deleteLinkItemSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class LinkItemsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteSelectedLinkItem = this.deleteSelectedLinkItem.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();

        getAllLinkItems(this.props.loggedUser.token).then(res => {
            // If failed to get all messages
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to get all links.'
                })
                return;
            }
            this.props.getAllLinkItemsSuccess(res.data);
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to get all links.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    componentDidMount() {
        document.getElementById("LinkItemsTable").scrollIntoView();
    }

    deleteSelectedLinkItem(linkItemId) {
        deleteLinkItem({ _id: linkItemId }, this.props.loggedUser.token).then(res => {
            // If failed to edit the user
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to delete link.'
                })
                return;
            }

            this.props.deleteLinkItemSuccess(linkItemId);
            this.props.showMessage({
                type: 'success',
                msg: 'link was deleted.'
            });
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to delete link.'
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
            Cell: props => <div>{props.value}</div>
        }, {
            Header: 'Link',
            accessor: 'url',
            Cell: props => <a href={props.value} style={{ textAlign: "right" }}>{props.value}</a>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            filterable: false,
            Cell: props => <Link to={"/LinkItems/EditLinkItem/" + props.value}>Edit</Link>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            filterable: false,
            Cell: props => <button onClick={() => this.deleteSelectedLinkItem(props.value)} className="btn btn-link">Delete</button>
        }];

        return <div id="LinkItemsTable"><ReactTable filterable defaultFilterMethod={(filter, row) => defaultFilterMethod(filter, row)} defaultPageSize={10} className="react-table-default" data={this.props.linkItemsList} columns={columns} /></div>
    }
}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { linkItemsList } = state.links;
    return { linkItemsList, loggedUser };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllLinkItemsSuccess: (allLinkItems) => { dispatch(getAllLinkItemsSuccess(allLinkItems)) },
        deleteLinkItemSuccess: (linkId) => { dispatch(deleteLinkItemSuccess(linkId)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkItemsList)