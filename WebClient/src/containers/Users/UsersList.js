import React, {Component} from 'react';
import ReactTable from 'react-table';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getAllUsers, deleteUsers } from '../../store/api/User'

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(userId)
    {
        alert("item was deleted " + userId);
    }
    
    componentDidMount() {
        document.getElementById("usersTable").scrollIntoView();
    }

    getAllUsers() {

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
            Cell: props => <div style={{fontSize:"12px"}}>{props.value}</div>
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

const mapStateToProps = ({users}) => {
  const {allUsersList} = users
  return {allUsersList}
};

export default withRouter(connect(mapStateToProps), {
  getAllUsers,
  deleteUsers
}) (UsersList);