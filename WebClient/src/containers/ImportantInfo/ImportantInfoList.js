import React, {Component} from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";

class ImportantInfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    componentDidMount() {
        document.getElementById("importantInfoTable").scrollIntoView();
    }

    render() {
        const data = [
            {
                "_id": "5cbc3b081c9d440000f0f7d5",
                "title": "PriorityTraining",
                "image": "Information/1.pdf",
                "displayName": "חוברת הדרכה פריורטי",
                "__v": 0
            },
            {
                "_id": "5cbc3b001c9d440000f0f7d4",
                "title": "CheckListDailyManager",
                "image": "Information/1.pdf",
                "displayName": "צ'ק ליסט יום יומי של מנהל הסניף",
                "__v": 0
            },
            {
                "_id": "5cbc3aea1c9d440000f0f7d3",
                "title": "CheckListnewManager",
                "image": "Information/1.pdf",
                "displayName": "צ'ק ליסט חניכת מנהל חדש",
                "__v": 0
            },
            {
                "_id": "5cbc32861c9d440000f0f7d2",
                "title": "Instruction",
                "image": "Information/1.pdf",
                "displayName": "חוברת הדרכה על הקופה",
                "__v": 0
            },
            {
                "_id": "5c8ba9d76363d7387cec8bc2",
                "title": "CheckListPriority",
                "image": "Information/צ'ק ליסט פריוריטי למנהל הסניף.pdf",
                "displayName": "צ'ק ליסט פריורטי",
                "__v": 0
            },
            {
                "_id": "5c8ba8ef6363d7387cec8bc1",
                "title": "Trainingfornewemployees",
                "image": "Information/חוברת הדרכה לעובד חדש.pdf",
                "displayName": "חוברת הדרכה לעובד חדש",
                "__v": 0
            },
            {
                "_id": "5c8ba77d6363d7387cec8bc0",
                "title": "CheckListNewEmploee",
                "image": "Information/צק ליסט לחניכת עובד חדש.pdf",
                "displayName": "צ'ק ליסט קליטת עובד חדש",
                "__v": 0
            },
            {
                "_id": "5c8b76e76363d7387cec8bbf",
                "title": "Kav",
                "image": "Information/1.pdf",
                "displayName": "קו קופה",
                "__v": 0
            },
            {
                "_id": "5c8b76b66363d7387cec8bbe",
                "title": "Mate",
                "image": "Information/מטה קמעונאות.pdf",
                "displayName": "מטה קמעונאות",
                "__v": 0
            },
            {
                "_id": "5c8b76a16363d7387cec8bbd",
                "title": "Branches",
                "image": "Information/סניפי קרביץ מעודכן.pdf",
                "displayName": "טלפונים מטה",
                "__v": 0
            },
            {
                "_id": "5c8b64076363d7387cec8bb3",
                "title": "Sales",
                "image": "Information/סטטוס מבצעים ושתפים.pdf",
                "displayName": "מבצעים",
                "__v": 0
            },
            {
                "_id": "5c87d8bf0cfed337bc10ab3f",
                "title": "harassment",
                "image": "Information/תקנון למניעת הטרדה מינית.pdf",
                "displayName": "תקנון מניעת הטרדה מינית",
                "__v": 0
            }
        ];
        
        const columns = [{
            Header: 'title',
            accessor: 'title',
            maxWidth: '400',
          }, {
            Header: 'File',
            accessor: 'image',
            Cell: props => <span className='number'>{props.value}</span>
          }, {
            Header: 'display name',
            accessor: 'displayName',
            maxWidth: '400',
        },{
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            Cell: props => <Link to={"/ImportantInfo/EditImportantInfo/" + props.value}>Edit</Link>
        }];

        return <div id="importantInfoTable"><ReactTable defaultPageSize={10} className= "react-table-default" data={data} columns={columns} /></div>
    }
}

export default ImportantInfoList