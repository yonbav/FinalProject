import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { deleteUser, getAllUsers } from '../../store/api';
import { getAllUsersSuccess, deleteUserSuccess, showFullLoader, hideFullLoader } from '../../store/actions';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillMount() {
    this.props.showFullLoader();

    getAllUsers(this.props.loggedUser.token).then(data => {
      this.props.getAllUsersSuccess(data.user);
    }).catch(error => {
      this.props.showMessage({
        type: 'error',
        msg: 'Failed to get all users.'
      })
    }).finally(() => {
      this.props.hideFullLoader();
    });
  }

  componentDidMount() {
    document.getElementById("usersTable").scrollIntoView();
  }

  deleteUser(userId) {
    this.props.showFullLoader();
    
    deleteUser(userId, this.props.loggedUser.token).then(data => {
       this.props.deleteUserSuccess(userId);
    }).catch(error => {
      this.props.showMessage({
        type: 'error',
        msg: 'Failed to delete users.'
      })
    }).finally(() => {
      this.props.hideFullLoader();
    })
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
      Header: 'Password',
      accessor: 'password',
      Cell: props => <div style={{ fontSize: "12px" }}>{props.value}</div>
    }, {
      Header: 'Birthday',
      accessor: 'birthday',
    }, {
      Header: 'Authorization',
      accessor: 'authorization',
    }, {
      Header: 'Gender',
      accessor: 'gender',
    }, {
      Header: 'Phone',
      accessor: 'phone_number',
    }, {
      Header: 'Branch',
      accessor: 'branch',
    }, {
      Header: '',
      accessor: '_id',
      maxWidth: '100',
      Cell: props => <Link to={"/Users/EditUser/" + props.value}>Edit</Link>
    }, {
      Header: '',
      accessor: '_id',
      maxWidth: '100',
      Cell: props => <button onClick={() => this.deleteUser(props.value)} className="btn btn-link">Delete</button>
    }];

    return <div id="usersTable"><ReactTable defaultPageSize={10} className="react-table-default" data={this.props.allUsersList} columns={columns} /></div>
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
    deleteUserSuccess: (userId) => { dispatch(deleteUserSuccess(userId)) },
    showMessage: (typ, msg) => { dispatch(showMessage(typ, msg)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);