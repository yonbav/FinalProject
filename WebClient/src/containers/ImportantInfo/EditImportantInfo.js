import React, { Component } from 'react';
import ImportantInfoView from './ImportantInfoView';

class EditImportantInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let importantInfo = 
        {
            _id: "5cbc3b081c9d440000f0f7d5",
            title: "PriorityTraining",
            image: "Information/1.pdf",
            displayName: "חוברת הדרכה פריורטי",
            __v: 0
        }

        return <ImportantInfoView Title="Edit Important Info"
            info={importantInfo} />
    }
}

export default EditImportantInfo