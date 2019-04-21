import React, {Component} from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";


class ImportantMessagesList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteImportantMessage = this.deleteImportantMessage.bind(this);
    }

    deleteImportantMessage(importantMessageId)
    {
        alert("item was deleted " + importantMessageId);
    }
    
    componentDidMount() {
        document.getElementById("ImportantMessageTable").scrollIntoView();
    }


    render() {
        const data = [{
            _id:"5c852bee6f8934451c86b529",
            title:"message1",
            date:"11/02/2018",
            content:"The content of message one"
        },{
            _id:"5c853408510aea4a889756eb",
            title:"message2",
            date:"11/02/2017",
            content:"The content of message tow"
        }];
        
        const columns = [{
            Header: 'Title',
            maxWidth: '300',
            accessor: 'title',
          }, {
            Header: 'Content',
            accessor: 'content',
            Cell: props => <div style={{textAlign:"left"}}>{props.value}</div>
          }, {
            Header: 'Midification Date',
            accessor: 'date',
            maxWidth: '300'
          }, {
              Header: '',
              accessor: '_id',
              maxWidth: '100',
              Cell: props => <Link to={"/ImportantMessages/EditImportantMessage/" + props.value}>Edit</Link>
          }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            Cell: props => <button onClick={() => this.deleteImportantMessage(props.value)} className="btn btn-link">Delete</button>
        }];

        return <div id="ImportantMessageTable"><ReactTable defaultPageSize={10} className="react-table-default" data={data} columns={columns} /></div>
    }
}

export default ImportantMessagesList