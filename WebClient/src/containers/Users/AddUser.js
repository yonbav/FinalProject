import React, {Component} from 'react';
import { connect } from 'react-redux'
import UserView from './UserView';
import {addUser} from '../../store/api/';
import {showMessage, addUserSuccess, showFullLoader, hideFullLoader} from '../../store/actions/';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.addNewUser = this.addNewUser.bind(this);
    }

    addNewUser(newUser) {
        this.props.showFullLoader();
        addUser(newUser, this.props.loggedUser.token).then(data => {
            this.props.addUserSuccess(newUser)
        })
        .catch(error => {error => {
            this.props.showMessage({ 
                type: 'error',
                msg: 'Failed to get all users.'
            })}})
        .finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        return <UserView formTitle="Add User" submitAction={this.addNewUser}/>
    }
}

const mapStateToProps = (state, ownProps) => {
    const {loggedUser} = state.user;
    return {
        loggedUser,
    }

}

const mapDispatchToProps = (dispatch) => {
        return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        addUserSuccess: (addedUser) => { dispatch(addUserSuccess(addedUser)) },
        showMessage: (typ,msg) => {dispatch(showMessage(typ,msg))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)