import React, {Component} from 'react';
import ImprtantMessageView from './ImportantMessageView';

class AddImportantMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <ImprtantMessageView formTitle="Edit Message" />
    }
}

export default AddImportantMessage