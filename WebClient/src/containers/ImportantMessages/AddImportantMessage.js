import React, { Component } from 'react';
import ImprtantMessageView from './ImportantMessageView';
import { connect } from 'react-redux';
import {addImportantMessage} from '../../store/api'
import { showMessage, addImportantMessageSuccess, showFullLoader, hideFullLoader } from '../../store/actions/';

class AddImportantMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.addNewImportantMessage = this.addNewImportantMessage.bind(this);
    }

    addNewImportantMessage(newMessage) {
        this.props.showFullLoader();
        addImportantMessage(newMessage, this.props.loggedUser.token).then(res => {
            // If failed to add the user
            if (res.status < 200 || res.status >=300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to add message.'
                })
                return;
            }

            this.props.addImportantMessageSuccess(newMessage);

            this.props.showMessage({
                type: 'success',
                msg: 'Message was successfully added.'
            })
            
            // Routing bact to the user addition
            window.location.href = "/ImportantMessages/ImportantMessagesList";
        })
        .catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to add message.'
            })
        })
        .finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        return <ImprtantMessageView formTitle="Add Message"
            submitAction={this.addNewImportantMessage} />
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
        addImportantMessageSuccess: (addedMessage) => { dispatch(addImportantMessageSuccess(addedMessage)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddImportantMessage)