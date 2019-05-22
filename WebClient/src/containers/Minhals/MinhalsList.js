import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { defaultFilterMethod, Constants } from '../../Common';
import { deleteMinhal, getAllMinhals } from '../../store/api';
import { getAllMinhalsSuccess, deleteMinhalSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class MinhalsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteMinhal = this.deleteMinhal.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();
        getAllMinhals(this.props.loggedUser.token).then(res => {
            // If failed to get all minhals
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to get all minhals.'
                })
            }
            this.props.getAllMinhalsSuccess(res.data);
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to get all minhals.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    componentDidMount() {
        document.getElementById("minhalTable").scrollIntoView();
    }

    deleteMinhal(minhalid) {
        this.props.showFullLoader();
        deleteMinhal({ _id: minhalid }, this.props.loggedUser.token).then(res => {
            // If failed to edit the user
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to delete minhal.'
                })
                return;
            }

            this.props.deleteMinhalSuccess(minhalid);
            this.props.showMessage({
                type: 'success',
                msg: 'minhal was deleted.'
            });
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to delete minhal.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        })
    }

    render() {
        const columns = [{
            Header: 'Title',
            accessor: 'title',
            Cell: props => <div>{props.value}</div>
        }, {
            Header: 'File Name',
            accessor: 'image',
            Cell: props => <a href={`${Constants.SERVER_URL}${Constants.PDF_FOLDER_NAME}${props.value}`}>{props.value}</a>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            filterable: false,
            Cell: props => <Link to={"/Minhals/EditMinhal/" + props.value}>Edit</Link>
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            filterable: false,
            Cell: props => <button onClick={() => this.deleteMinhal(props.value)} className="btn btn-link">Delete</button>
        }];

        return <div id="minhalTable"><ReactTable filterable defaultFilterMethod={(filter, row) => defaultFilterMethod(filter, row)} defaultPageSize={10} className="react-table-default" data={this.props.minhalsList} columns={columns} /></div>
    }
}


const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { minhalsList } = state.minhals;
    return { minhalsList, loggedUser };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllMinhalsSuccess: (allMinhals) => { dispatch(getAllMinhalsSuccess(allMinhals)) },
        deleteMinhalSuccess: (minhalId) => { dispatch(deleteMinhalSuccess(minhalId)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MinhalsList)