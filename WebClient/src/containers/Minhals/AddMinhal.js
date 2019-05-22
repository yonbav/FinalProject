import React, { Component } from 'react';
import MinhalView from './MinhalView';
import { connect } from 'react-redux';
import { addMinhal } from '../../store/api';
import {convertJsonToFormData} from '../../Utils/JsonUtils';
import { addMinhalSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class AddMinhal extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.addNewMinhal = this.addNewMinhal.bind(this);
    }

    addNewMinhal(newMinhal) {
        this.props.showFullLoader();
        var formDataMinhal = convertJsonToFormData(newMinhal);
        addMinhal(formDataMinhal, this.props.loggedUser.token).then(res => {
            // If failed to add the user
            if (res.status < 200 || res.status >=300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to add minhal.'
                })
                return;
            }

            this.props.addMinhalSuccess(newMinhal);

            this.props.showMessage({
                type: 'success',
                msg: 'minhal was successfully added.'
            })
        })
        .catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to add minhal.'
            })
        })
        .finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        return <MinhalView Title="Add Minhal"
            submitAction={this.addNewMinhal} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const {loggedUser} = state.users
    return {loggedUser};
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        addMinhalSuccess: (newMinhal) => { dispatch(addMinhalSuccess(newMinhal)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMinhal);