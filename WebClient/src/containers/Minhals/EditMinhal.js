import React, { Component } from 'react';
import MinhalView from './MinhalView';
import { connect } from 'react-redux';
import {convertJsonToFormData} from '../../Utils/JsonUtils';
import { editMinhal, getAllMinhals } from '../../store/api';
import { getAllMinhalsSuccess, editMinhalSuccess, showFullLoader, showMessage, hideFullLoader } from '../../store/actions'

class EditMinhal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.editMinhal = this.editMinhal.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();
        getAllMinhals(this.props.loggedUser.token).then(res => {
            // If failed to get all messages
            if (res.status < 200 || res.status >= 300) {
                return;
            }
            this.props.getAllMinhalsSuccess(res.data);
        }).catch(error => {
            console.log(error);
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
                    msg: 'Failed to edit minhal.'
                })
                return;
            }

            this.props.editMinhalSuccess(editedMinhal);
            this.props.showMessage({
                type: 'success',
                msg: 'minhal was edited.'
            })
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to edit minhal.'
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

        return <MinhalView Title="Edit Daily Minhal"
            minhal={minhal}
            submitAction={this.editMinhal} />
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