import React, { Component } from 'react';
import ImportantInfoView from './ImportantInfoView';
import { editImportantInfo, getAllImportantInfo } from '../../store/actions/ImportantInfo';
import { connect } from 'react-redux';

class EditImportantInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.editInfo = this.editInfo.bind(this);
    }

    componentWillMount() {
        this.props.getAllInfo();
    }

    editInfo(editedInfo) {
        this.props.editImportantInfo(editedInfo)
    }

    render() {
        let infoToEdit = this.props.importantInfoList.find(info => info._id === this.props.match.params.id)
        return <ImportantInfoView Title="Edit Important Info"
            info={infoToEdit}
            submitAction={this.editInfo} />
    }
}

const mapStateToProps = (state, ownProps) => {
    const { importantInfoList } = state.info
    return { importantInfoList };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInfo: () => { dispatch(getAllImportantInfo()) },
        editImportantInfo: (editedInfo) => { dispatch(editImportantInfo(editedInfo)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditImportantInfo)