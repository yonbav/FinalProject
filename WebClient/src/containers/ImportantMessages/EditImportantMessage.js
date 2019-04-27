import React, { Component } from 'react';
import ImprtantMessageView from './ImportantMessageView';
import { editImportantMessage, getAllImportantMessages } from '../../store/actions/ImportantMessage';
import { connect } from 'react-redux';

class EditImportantMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.editImportantMessage = this.editImportantMessage.bind(this);
    }

    componentWillMount() {
        this.props.getAllImportantMessages();
    }

    editImportantMessage(editedInfo) {
        this.props.editImportantMessage(editedInfo)
    }

    render() {
        let messageToEdit = this.props.importantMessagesList ? this.props.importantMessagesList.find(message => message._id === this.props.match.params.id) : {};
        return <ImprtantMessageView formTitle="Edit Message" 
            message={messageToEdit}
            submitAction={this.editImportantMessage} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const { importantMessagesList } = state.messages;
    return { importantMessagesList };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllImportantMessages: () => { dispatch(getAllImportantMessages()) },
        editImportantMessage: (editedMessage) => { dispatch(editImportantMessage(editedMessage)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditImportantMessage);