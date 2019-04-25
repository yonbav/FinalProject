import React, {Component} from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";

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

    render() {
        const data = [{
            _id: "5c778444498c1447cc232eec",
            firstname: "ירין",
            lastname: "דיגה",
            id: "3",
            password: "1234567890",
            birthday: "11/03/2011",
            authorization: "5",
            email: "shalom@gmail.com",
            gender: "male",
            phone_number: "050-333-3333",
            branch: "ראשון לציון",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNzc4NDQ0NDk4YzE0NDdjYzIzMmVlYyIsImlhdCI6MTU1MjgxNDAzMX0.GxMIMuV4ToCjNMbMWZqjC2vqPhBPCpjSfR4yvF3L848"
        },{
            _id: "5c778444498c1447cc232eec",
            firstname: "רונאל",
            lastname: "שם טוב",
            id: "2",
            password: "1234567890",
            birthday: "30/03/2011",
            authorization: "1",
            email: "idanlazar8241@gmail.com",
            gender: "male",
            phone_number: "050-333-3333",
            branch: "ראשון לציון",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNzc4NDI5NDk4YzE0NDdjYzIzMmVlYiIsImlhdCI6MTU1NDk5OTAwN30.eyzwDNkp6Wlkz9WApiwA7iRGYJX3W6UBIX5yIC1QjSc"
        }];
        
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

        return <div id="usersTable"><ReactTable defaultPageSize={10} className="react-table-default" data={data} columns={columns} /></div>
    }
}

export default UsersList