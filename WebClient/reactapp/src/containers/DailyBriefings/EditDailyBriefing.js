import React, {Component} from 'react';

class EditDailyBriefing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div>EditDailyBriefing {this.props.match.params.BriefingId}</div>)
    }
}

export default EditDailyBriefing