import React, {Component} from 'react';
import { connect } from 'react-redux'
import UserView from './UserView';
import {addUser} from '../../store/actions/User'

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.addNewUser = this.addNewUser.bind(this);
    }

    addNewUser(newUser) {
        this.props.addUser(newUser)
    }

    render() {
        return <UserView formTitle="Add User" submitAction={this.addNewUser}/>
    }
}

const mapDispatchToProps = (dispatch) => {
        return {
        addUser: (newUser) => { dispatch(addUser(newUser)) }
    }
}

export default connect(null, mapDispatchToProps)(AddUser)