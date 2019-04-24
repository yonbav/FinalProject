import React, {Component} from 'react';
import UserView from './UserView';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <UserView formTitle="Edit User"/>
    }
}

export default AddUser