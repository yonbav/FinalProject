import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {  getAllImportantInfo } from '../../store/api';
import { getAllImportantInfoSuccess, showFullLoader, hideFullLoader, showMessage } from '../../store/actions/';

class ImportantInfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.showFullLoader();

        getAllImportantInfo(this.props.loggedUser.token).then(res => {
            // If failed to get all info
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to get all info.'
                })
                return;
            }
            this.props.getAllImportantInfoSuccess(res.data);
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to get all info.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    componentDidMount() {
        document.getElementById("importantInfoTable").scrollIntoView();
    }

    render() {
        const columns = [{
            Header: 'title',
            accessor: 'title',
            maxWidth: '400',
        }, {
            Header: 'File',
            accessor: 'image',
            Cell: props => <span className='number'>{props.value}</span>
        }, {
            Header: 'display name',
            accessor: 'displayName',
            maxWidth: '400',
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            Cell: props => <Link to={"/ImportantInfo/EditImportantInfo/" + props.value}>Edit</Link>
        }];

        return <div id="importantInfoTable"><ReactTable defaultPageSize={10} className="react-table-default" data={this.props.importantInfoList} columns={columns} /></div>
    }
}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { importantInfoList } = state.info
    return { importantInfoList, loggedUser };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllImportantInfoSuccess: (allInfo) => { dispatch(getAllImportantInfoSuccess(allInfo)) },
        showMessage: (typ, msg) => { dispatch(showMessage(typ, msg)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportantInfoList)