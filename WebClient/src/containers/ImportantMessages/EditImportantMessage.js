import React, { Component } from 'react';
import ImprtantMessageView from './ImportantMessageView';
import { connect } from 'react-redux';
import { convertJsonToPatchString } from '../../Utils/JsonUtils';
import { editImportantMessage, getAllImportantMessages } from '../../store/api';
import { showMessage, getAllImportantMessagesSuccess, editImportantMessageSuccess, showFullLoader, hideFullLoader } from '../../store/actions/';

class EditImportantMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.editImportantMessage = this.editImportantMessage.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();
        getAllImportantMessages(this.props.loggedUser.token).then(res => {
            // If failed to get all messages
            if (res.status < 200 || res.status >= 300) {
                return;
            }
            this.props.getAllImportantMessagesSuccess(res.data);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    editImportantMessage(editedMessage) {
        this.props.showFullLoader();
        let messageString = convertJsonToPatchString(editedMessage)

        editImportantMessage(editedMessage._id, messageString, this.props.loggedUser.token).then(res => {
            // If failed to edit the message
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to edit message.'
                })
                return;
            }

            this.props.editImportantMessageSuccess(editedMessage);
            this.props.showMessage({
                type: 'success',
                msg: 'message was edited.'
            })
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to edit message.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        let messageToEdit = this.props.importantMessagesList ? this.props.importantMessagesList.find(message => message._id === this.props.match.params.id) : {};
        return <ImprtantMessageView formTitle="Edit Message"
            message={messageToEdit}
            submitAction={this.editImportantMessage} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { importantMessagesList } = state.messages;
    return { importantMessagesList, loggedUser }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllImportantMessagesSuccess: (allMessages) => { dispatch(getAllImportantMessagesSuccess(allMessages)) },
        editImportantMessageSuccess: (editedMessage) => { dispatch(editImportantMessageSuccess(editedMessage)) },
        showMessage: (typ, msg) => { dispatch(showMessage(typ, msg)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditImportantMessage);