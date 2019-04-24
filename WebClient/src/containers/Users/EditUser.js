import React, {Component} from 'react';
import UserView from './UserView';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var userToEdit = {
            _id: "5c778444498c1447cc232eec",
            firstname: "רונאל",
            lastname: "שם טוב",
            id: "2",
            password: "1234567890",
            birthday: "30/03/2011",
            authorization: "1",
            gender: "male",
            phone_number: "050-333-3333",
            branch: "ראשון לציון",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNzc4NDI5NDk4YzE0NDdjYzIzMmVlYiIsImlhdCI6MTU1NDk5OTAwN30.eyzwDNkp6Wlkz9WApiwA7iRGYJX3W6UBIX5yIC1QjSc"
        }
        return <UserView formTitle="Edit User"
                        user={userToEdit}/>
    }
}

export default EditUser;