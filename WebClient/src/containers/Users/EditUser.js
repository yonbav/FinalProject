import React, { Component } from 'react';
import UserView from './UserView';
import { connect } from 'react-redux';
import { editUser, getAllUsers } from '../../store/api';
import { convertJsonToPatchString } from '../../Utils/JsonUtils';
import {showMessage, getAllUsersSuccess, editUserSuccess, showFullLoader, hideFullLoader} from '../../store/actions/';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.editUser = this.editUser.bind(this);
        this.loadAllUsers = this.loadAllUsers.bind(this);
    }

    componentWillMount() {
        if (!this.props.allUsersList || this.props.allUsersList.length === 0)
            this.loadAllUsers()
    }

    loadAllUsers() {
        this.props.showFullLoader();

        getAllUsers(this.props.loggedUser.token).then(res => {
            this.props.getAllUsersSuccess(res.data.user);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    editUser(editedUser) {
        this.props.showFullLoader();
        let userString = convertJsonToPatchString(editedUser)

        editUser(editedUser._id, userString, this.props.loggedUser.token).then(res => {
            // If failed to edit the user
            if (res.status < 200 || res.status >=300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to edit user.'
                })
                return;
            }

            this.props.editUserSuccess(editedUser);
            this.props.showMessage({ 
                type: 'success',
                msg: 'User was edited.'
            })
        }).catch(error => {
            this.props.showMessage({ 
                type: 'error',
                msg: 'Failed to edit user.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        let userToEdit = this.props.allUsersList ? this.props.allUsersList.find(usr => usr._id === this.props.match.params.id) : {};

        if (userToEdit === undefined)
        {
            return <div>Error Occurred!</div>            
        }

        return <UserView formTitle="Edit User"
            user={userToEdit}
            submitAction={this.editUser}
            isShowPassword={false} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const { allUsersList, loggedUser } = state.users
    return { allUsersList, loggedUser }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllUsersSuccess: (allUsers) => {dispatch(getAllUsersSuccess(allUsers))},
        editUserSuccess: (editedUser) => {dispatch(editUserSuccess(editedUser))},
        showMessage: (message) => {dispatch(showMessage(message))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);