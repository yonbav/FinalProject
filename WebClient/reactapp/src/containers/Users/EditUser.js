import React, {Component} from 'react';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>EditUser { this.props.match.params.UserId }</div>
    }
}

export default EditUser;