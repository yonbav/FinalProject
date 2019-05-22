import React, {Component} from 'react';
import LinkItemvView from './LinkItemView';
import { connect } from 'react-redux';
import { convertJsonToPatchString } from '../../Utils/JsonUtils';
import { editLinkItem, getAllLinkItems } from '../../store/api';
import { showMessage, getAllLinkItemsSuccess, editLinkItemSuccess, showFullLoader, hideFullLoader } from '../../store/actions/';

class EditLinkItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.editLinkItem = this.editLinkItem.bind(this);
    }

    componentWillMount() {
        this.props.showFullLoader();
        getAllLinkItems(this.props.loggedUser.token).then(res => {
            // If failed to get all messages
            if (res.status < 200 || res.status >= 300) {
                return;
            }
            this.props.getAllLinkItemsSuccess(res.data);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    editLinkItem (editedLinkItem) {
        this.props.showFullLoader();
        let linkItemString = convertJsonToPatchString(editedLinkItem)

        editLinkItem(editedLinkItem._id, linkItemString, this.props.loggedUser.token).then(res => {
            // If failed to edit the link
            if (res.status < 200 || res.status >= 300) {
                this.props.showMessage({
                    type: 'error',
                    msg: 'Failed to edit link.'
                })
                return;
            }

            this.props.editLinkItemSuccess(editedLinkItem);
            this.props.showMessage({
                type: 'success',
                msg: 'link was edited.'
            })
        }).catch(error => {
            this.props.showMessage({
                type: 'error',
                msg: 'Failed to edit link.'
            })
        }).finally(() => {
            this.props.hideFullLoader();
        });
    }

    render() {        
        let linkItemToEdit = this.props.linkItemsList ? this.props.linkItemsList.find(link => link._id === this.props.match.params.id) : {};

        if (linkItemToEdit === undefined)
        {
            return <div>Error Occurred!</div>
        }

        return <LinkItemvView formTitle="Edit Link"
            linkItem={linkItemToEdit}
            submitAction={this.editLinkItem} />
    }

}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser } = state.users;
    const { linkItemsList } = state.links;
    return { linkItemsList, loggedUser }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showFullLoader: () => { dispatch(showFullLoader()) },
        hideFullLoader: () => { dispatch(hideFullLoader()) },
        getAllLinkItemsSuccess: (allLinks) => { dispatch(getAllLinkItemsSuccess(allLinks)) },
        editLinkItemSuccess: (editedLink) => { dispatch(editLinkItemSuccess(editedLink)) },
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLinkItem);