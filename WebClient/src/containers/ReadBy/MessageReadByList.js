import React, { Component } from 'react';
import ReadByList from './ReadByList';
import {connect} from 'react-redux';
import { showMessage } from '../../store/actions';

class MessageReadByList extends Component {
    constructor(props) {
        super(props);
        this.state = {readby:[]}
        this.getSelectedMessage = this.getSelectedMessage.bind(this);
    }

    componentWillMount() {
        let selectedMessage = this.getSelectedMessage();

        // if we didn't find selectedBriefing with the given id
        if (!selectedMessage || !selectedMessage.readby)
        {
            this.props.showMessage({type:'error', msg:'could not get readby list, unknown briefing'})
            return;
        }

        this.setState({readby:selectedMessage.readby});
    }

    getSelectedMessage() {
        return this.props.importantMessagesList.find(msg => msg._id === this.props.match.params.id)
    }

    render() {
        return <ReadByList readby={this.state.readby}></ReadByList>
    }
}

const mapStateToProps = (state, ownProps) => {
    const { importantMessagesList } = state.messages
    return { importantMessagesList }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageReadByList);