import React, { Component } from 'react';
import UserView from './UserView';
import { connect } from 'react-redux';
import { editUser, getAllUsers } from '../../store/api';
import {showMessage, getAllUsersSuccess, editUserSuccess, showFullLoader, hideFullLoader} from '../../store/actions/';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.editUser = this.editUser.bind(this);
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

    editUser(editedUser) {
        this.props.showFullLoader();

        editUser(editedUser.id, editedUser, this.props.loggedUser.token).then(data => {
            this.props.editUserSuccess(editedUser);
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
        let userToEdit = this.props.allUsersList ? this.props.allUsersList.find(usr => usr._id === this.props.match.params.id) : {};
        return <UserView formTitle="Edit User"
            user={userToEdit}
            submitAction={this.editUser} />
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
        editUserSuccess: (allUsers) => {dispatch(editUserSuccess(allUsers))},
        showMessage: (typ,msg) => {dispatch(showMessage(typ,msg))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);