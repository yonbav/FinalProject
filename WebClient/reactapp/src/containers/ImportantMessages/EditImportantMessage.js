import React, {Component} from 'react';

class EditImportantMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>EditImportantMessage {this.props.match.params.MessageId}</div>
    }
}

export default EditImportantMessage;