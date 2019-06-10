import React, { Component } from 'react';
import MinhalView from './MinhalView';
import { Constants } from '../../Common';
import { connect } from 'react-redux';
import {convertJsonToFormData} from '../../Utils/JsonUtils';
import { editMinhal, getAllMinhals, getAllGuidances, editGuidance} from '../../store/api';
import { getAllMinhalsSuccess, editMinhalSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class EditMinhal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.editMinhal = this.editMinhal.bind(this);
        this.editGuidance = this.editGuidance.bind(this);
        this.editAdministration = this.editAdministration.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();
        getAllMinhals(this.props.loggedUser.token).then(res => {
            // If failed to get all minhals
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to get all minhals.'
                })
            }

            let allAdministrations = [];

            res.data.forEach(minhal => {
                minhal.type = Constants.ADMINISTRATIONS.MINHAL;                
                allAdministrations.push(minhal)
            });

            getAllGuidances(this.props.loggedUser.token).then(res => {
                
                // If failed to get all minhals
                if (res.status < 200 || res.status >= 300) {
                    this.props.showMessage({
                        type: 'error',
                        msg: 'Failed to get all minhals.'
                    })
                }

                res.data.forEach(guidance => {
                    guidance.type = Constants.ADMINISTRATIONS.GUIDANCE;                    
                    allAdministrations.push(guidance)
                });

                this.props.getAllMinhalsSuccess(allAdministrations);
            })
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to get all minhals.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    editAdministration(editedAdministration)
    {
        if (editedAdministration.type === Constants.ADMINISTRATIONS.MINHAL)
        {
            this.editMinhal(editedAdministration)
        }
        else if (editedAdministration.type === Constants.ADMINISTRATIONS.GUIDANCE)
        {
            this.editGuidance(editedAdministration)
        }
        else {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to edit administration. uknown type'
            })
            return;
        }
    }

    editGuidance (editedGuidance)
    {
        this.props.showFullLoader();
        var formDataGuidance = convertJsonToFormData(editedGuidance);
        editGuidance(editedGuidance._id, formDataGuidance, this.props.loggedUser.token).then(res => {
            // If failed to edit the guidance
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to edit administration.'
                })
                return;
            }

            this.props.editMinhalSuccess(editedGuidance);
            this.props.showMessage({
                type: 'success',
                msg: 'administration was edited.'
            })
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to edit administration.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }
    
    editMinhal(editedMinhal) {
        this.props.showFullLoader();
        var formDataMinhal = convertJsonToFormData(editedMinhal);
        editMinhal(editedMinhal._id, formDataMinhal, this.props.loggedUser.token).then(res => {
            // If failed to edit the minhal
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to edit administration.'
                })
                return;
            }

            this.props.editMinhalSuccess(editedMinhal);
            this.props.showMessage({
                type: 'success',
                msg: 'Administration was edited.'
            })
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to edit administration.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        let minhal = this.props.minhalsList ? this.props.minhalsList.find(brief => brief._id === this.props.match.params.id) : {};
        
        if (minhal === undefined)
        {
            return <div>Error Occurred!</div>            
        }

        return <MinhalView Title="Edit Administration"
            minhal={minhal}
            submitAction={this.editAdministration} 
            allowTypeChoose={false}/>
    }
}


const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { minhalsList } = state.minhals;
    return { minhalsList, loggedUser };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllMinhalsSuccess: (allMinhals) => { dispatch(getAllMinhalsSuccess(allMinhals)) },
        editMinhalSuccess: (editedMinhal) => { dispatch(editMinhalSuccess(editedMinhal)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditMinhal)