import React, { Component } from 'react';
import { connect } from 'react-redux'
import UserView from './UserView';
import { addUser } from '../../store/api/';
import { showMessage, addUserSuccess, showFullLoader, hideFullLoader } from '../../store/actions/';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.addNewUser = this.addNewUser.bind(this);
    }

    addNewUser(newUser) {
        this.props.showFullLoader();
        addUser(newUser, this.props.loggedUser.token).then(res => {
            // If failed to add the user
            if (res.status < 200 || res.status >=300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to add user.'
                })
                return;
            }

            this.props.addUserSuccess(newUser)

            this.props.showMessage({
                type: 'success',
                msg: 'User was successfully added.'
            })
            
            // Routing bact to the user addition
            window.location.href = "/users/UsersList";
        })
        .catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to add users.'
            })
        })
        .finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        return <UserView formTitle="Add User" isShowPassword={true} submitAction={this.addNewUser} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    return { loggedUser }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        addUserSuccess: (addedUser) => { dispatch(addUserSuccess(addedUser)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)