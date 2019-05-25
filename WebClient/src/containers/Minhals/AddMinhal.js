import React, { Component } from 'react';
import MinhalView from './MinhalView';
import { connect } from 'react-redux';
import { Constants } from '../../Common';
import { addMinhal, addGuidance } from '../../store/api';
import {convertJsonToFormData} from '../../Utils/JsonUtils';
import { addMinhalSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class AddMinhal extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.addNewMinhal = this.addNewMinhal.bind(this);
        this.addNewGuidance = this.addNewGuidance.bind(this);
        this.addNewAdminstration = this.addNewAdminstration.bind(this);
    }
    addNewAdminstration (newAdminstration) {
        if (newAdminstration.type === Constants.ADMINISTRATIONS.MINHAL)
        {
            this.addNewMinhal(newAdminstration);
        }
        else if (newAdminstration.type === Constants.ADMINISTRATIONS.GUIDANCE)
        {
            this.addNewGuidance(newAdminstration);            
        }
        else {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to add administration. uknown type'
            })
            return;
        }
    }

    addNewMinhal(newMinhal) {
        this.props.showFullLoader();
        var formDataMinhal = convertJsonToFormData(newMinhal);
        addMinhal(formDataMinhal, this.props.loggedUser.token).then(res => {
            // If failed to add the minhal
            if (res.status < 200 || res.status >=300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to add administration.'
                })
                return;
            }

            this.props.addMinhalSuccess(newMinhal);

            this.props.showMessage({
                type: 'success',
                msg: 'Administration was successfully added.'
            })
        })
        .catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to add administration.'
            })
        })
        .finally(() => {
            this.props.hideFullLoader();
        });
    }
    
    addNewGuidance(newGuidance) {
        this.props.showFullLoader();
        var formDataGuidance = convertJsonToFormData(newGuidance);
        addGuidance(formDataGuidance, this.props.loggedUser.token).then(res => {
            // If failed to add the guidance
            if (res.status < 200 || res.status >=300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to add administration.'
                })
                return;
            }

            this.props.addMinhalSuccess(newGuidance);

            this.props.showMessage({
                type: 'success',
                msg: 'Guidance was successfully added.'
            })
        })
        .catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to add administration.'
            })
        })
        .finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        return <MinhalView Title="Add Administration"
            submitAction={this.addNewAdminstration} 
            allowTypeChoose={true}/>
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