import React, { Component } from 'react';
import ImportantInfoView from './ImportantInfoView';
import { editImportantInfo, getAllImportantInfo } from '../../store/api/';
import { convertJsonToFormData } from '../../Utils/JsonUtils';
import { editImportantInfoSuccess, getAllImportantInfoSuccess, showFullLoader, hideFullLoader, showMessage } from '../../store/actions/';
import { connect } from 'react-redux';

class EditImportantInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.editInfo = this.editInfo.bind(this);
    }

    componentWillMount() {
        getAllImportantInfo(this.props.loggedUser.token).then(res => {
            // If failed to get all info
            if (res.status < 200 || res.status >= 300) {
                return;
            }
            this.props.getAllImportantInfoSuccess(res.data);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    editInfo(editedInfo) {        
        this.props.showFullLoader();
        let infoFormData = convertJsonToFormData(editedInfo)
        editImportantInfo(editedInfo._id, infoFormData, this.props.loggedUser.token).then(res => {
            // If failed to edit the info
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to edit info.'
                })
                return;
            }

            this.props.editImportantInfoSuccess(editedInfo);
            this.props.showMessage({
                type: 'success',
                msg: 'info was edited.'
            })
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to edit info.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        let infoToEdit = this.props.importantInfoList ? this.props.importantInfoList.find(info => info._id === this.props.match.params.id) : {};

        if (infoToEdit === undefined)
        {
            return <div>Error Occurred!</div>            
        }

        return <ImportantInfoView Title="Edit Important Info"
            info={infoToEdit}
            submitAction={this.editInfo} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { importantInfoList } = state.info
    return { importantInfoList, loggedUser }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllImportantInfoSuccess: (allInfo) => { dispatch(getAllImportantInfoSuccess(allInfo)) },
        editImportantInfoSuccess: (editedInfo) => { dispatch(editImportantInfoSuccess(editedInfo)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditImportantInfo)