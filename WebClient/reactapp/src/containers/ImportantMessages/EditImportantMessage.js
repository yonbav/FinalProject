import React, {Component} from 'react';
import ImprtantMessageView from './ImportantMessageView';

class EditImportantMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var messageToEdit = {
            title:"Message 1",
            content:"message content",
            date:"11/12/2018"
        };

        return <ImprtantMessageView formTitle="Edit Message" 
                                    message={messageToEdit}/>
    }
}

export default EditImportantMessage;