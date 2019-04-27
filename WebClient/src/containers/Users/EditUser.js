import React, { Component } from 'react';
import UserView from './UserView';
import { connect } from 'react-redux';
import { editUser, getAllUsers } from '../../store/actions/User';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.editUser = this.editUser.bind(this);
    }

    componentWillMount() {
        this.props.getAllUsers();
    }

    editUser(editedUser) {
        this.props.editUser(editedUser)
    }

    render() {
        let userToEdit = this.props.allUsersList.find(usr => usr._id === this.props.match.params.id);
        return <UserView formTitle="Edit User"
            user={userToEdit}
            submitAction={this.editUser} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const { allUsersList } = state.users
    return { allUsersList }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (userId, editedUser) => { dispatch(editUser(userId, editedUser)) },
        getAllUsers: () => { dispatch(getAllUsers()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);