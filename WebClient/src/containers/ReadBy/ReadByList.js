import React, { Component } from 'react';
import ReactTable from 'react-table';
import { CSVLink } from "react-csv";
import { connect } from 'react-redux';
import moment from 'moment';
import { getAllUsers } from '../../store/api';
import {EnumFunctions, defaultFilterMethod} from '../../Common';
import { showMessage, getAllUsersSuccess, showFullLoader, hideFullLoader } from '../../store/actions';

class ReadByList extends Component {
    constructor(props) {
        super(props);
        this.state = { readByUsers:[] }
        this.getAllUsersFromSever = this.getAllUsersFromSever.bind(this);
    }

    componentDidMount() {
        document.getElementById("usersTable").scrollIntoView();
    }

    componentWillMount() {
        this.getAllUsersFromSever();
        var readingUsersList = this.props.allUsersList.filter(user => this.props.readby && this.props.readby.some(id => id === user.id))
        this.setState({readByUsers:readingUsersList});
    }

    getAllUsersFromSever() {
        this.props.showFullLoader();

        getAllUsers(this.props.loggedUser.token).then(res => {
            // If failed to get all users
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to edit user.'
                })
                return;
            }
            this.props.getAllUsersSuccess(res.data.user);
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to get all users.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        const columns = [{
            Header: 'ID',
            accessor: 'id',
        }, {
            Header: 'First Name',
            accessor: 'firstname',
        }, {
            Header: 'Last Name',
            accessor: 'lastname',
        }, {
            Header: 'Authorization',
            id: "authorization",
            accessor: item => EnumFunctions.AuthEnumToString(item.authorization),
            Cell: props => <div>{props.value}</div>,
        },{
            Header: 'Branch',
            accessor: 'branch',
          }
        ];

        const csvHeaders = [
            { label: "ID", key: "id" },
            { label: "First Name", key: "firstname" },
            { label: "Last Name", key: "lastname" },
            { label: "Authorization", key: "authorization" },
            { label: "Branch", key: "branch" },
        ];
        
        const csvFileName = `readby_${moment().format("DD_MM_YYYY_hh_mm_ss")}.csv` 
           
        return (<div id="usersTable">
            <ReactTable filterable defaultFilterMethod={(filter, row) => defaultFilterMethod(filter, row)} defaultPageSize={10} className="react-table-default" data={this.state.readByUsers} columns={columns} />
            <div style={{fontWieght:"700", textDecoration:"underline", fontSize: "20px", display:"flex", justifyContent:"center"}}><CSVLink filename={csvFileName} data={this.state.readByUsers} headers={csvHeaders}>Import to Excel</CSVLink></div>
            </div>);
    }
}


const mapStateToProps = (state, ownProps) => {
    const { allUsersList, loggedUser } = state.users
    return { allUsersList, loggedUser }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllUsersSuccess: (allUsers) => { dispatch(getAllUsersSuccess(allUsers)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadByList);