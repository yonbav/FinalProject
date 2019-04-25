import React, {Component} from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";

class DailyBriefingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteDailyBriefing = this.deleteDailyBriefing.bind(this);
    }

    deleteDailyBriefing(dailyBriefingid)
    {
        alert("item was deleted " + dailyBriefingid);
    }
    
    componentDidMount() {
        document.getElementById("dailyBreifingTable").scrollIntoView();
    }

    render() {
        const data = [{
            _id:"5c852bee6f8934451c86b529",
            title:"2.9",
            image:"uploads/l2 - concurrent design patterns.pdf"
        },{
            _id:"5c853408510aea4a889756eb",
            title:"3.9",
            image:"uploads/l2 - concurrent design patterns.pdf"
        }];
        
        const columns = [{
            Header: 'Date',
            accessor: 'title',
          }, {
            Header: 'File Name',
            accessor: 'image',
            Cell: props => <span className='number'>{props.value}</span>
          }, {
              Header: '',
              accessor: '_id',
              maxWidth: '100',
              Cell: props => <Link to={"/DailyBriefings/EditDailyBriefing/" + props.value}>Edit</Link>
          }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            Cell: props => <button onClick={() => this.deleteDailyBriefing(props.value)} className="btn btn-link">Delete</button>
        }];

        return <div id="dailyBreifingTable"><ReactTable defaultPageSize={10} className= "react-table-default" data={data} columns={columns} /></div>
    }
}

export default DailyBriefingsList