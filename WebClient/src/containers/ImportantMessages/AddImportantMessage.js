import React, { Component } from 'react';
import ImprtantMessageView from './ImportantMessageView';
import { connect } from 'react-redux';
import { addImportantMessage } from '../../store/actions';

class AddImportantMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.addNewImportantMessage = this.addNewImportantMessage.bind(this);
    }

    addNewImportantMessage(newMessage) {
        this.props.addImportantMessage(newMessage);
    }

    render() {
        return <ImprtantMessageView formTitle="Add Message"
            submitAction={this.addNewImportantMessage} />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addImportantMessage: (newMessage) => { dispatch(addImportantMessage(newMessage)) },
    }
}

export default connect(null, mapDispatchToProps)(AddImportantMessage)