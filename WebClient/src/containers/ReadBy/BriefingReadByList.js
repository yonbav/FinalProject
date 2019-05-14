import React, { Component } from 'react';
import ReadByList from './ReadByList';
import { connect } from 'react-redux';
import { showMessage } from '../../store/actions';

class BriefingReadByList extends Component {
    constructor(props) {
        super(props);
        this.state = {readby:[]}
        this.getSelectedBriefing = this.getSelectedBriefing.bind(this);
    }

    componentWillMount() {
        let selectedBriefing = this.getSelectedBriefing();

        // if we didn't find selectedBriefing with the given id
        if (!selectedBriefing || !selectedBriefing.readby)
        {
            this.props.showMessage({type:'error', msg:'could not get readby list, unknown briefing'})
            return;
        }

        this.setState({readby:selectedBriefing.readby});
    }

    getSelectedBriefing() {
        return this.props.dailyBriefingsList.find(brief => brief._id === this.props.match.params.id)
    }

    render() {
        return <ReadByList readby={this.state.readby}></ReadByList>
    }
}

const mapStateToProps = (state, ownProps) => {
    const { dailyBriefingsList } = state.briefings
    return { dailyBriefingsList }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showMessage: (message) => { dispatch(showMessage(message)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefingReadByList);