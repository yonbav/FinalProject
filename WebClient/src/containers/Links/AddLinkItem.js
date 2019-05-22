import React, {Component} from 'react';
import LinkItemvView from './LinkItemView';
import { connect } from 'react-redux';
import {addLinkItem} from '../../store/api'
import { showMessage, addLinkItemSuccess, showFullLoader, hideFullLoader } from '../../store/actions/';

class AddLinkItem extends Component {
    constructor(props) {
        super(props);
        this.addNewLinkItem = this.addNewLinkItem.bind(this);
    }

    addNewLinkItem (newLinkItem) {
        this.props.showFullLoader();
        addLinkItem(newLinkItem, this.props.loggedUser.token).then(res => {
            // If failed to add the user
            if (res.status < 200 || res.status >=300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to add link.'
                })
                return;
            }

            this.props.addLinkItemSuccess(newLinkItem);

            this.props.showMessage({
                type: 'success',
                msg: 'link was successfully added.'
            })
        })
        .catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to add link.'
            })
        })
        .finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {
        return <LinkItemvView formTitle="Add Link"
            submitAction={this.addNewLinkItem} />
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
        addLinkItemSuccess: (addedLink) => { dispatch(addLinkItemSuccess(addedLink)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLinkItem);