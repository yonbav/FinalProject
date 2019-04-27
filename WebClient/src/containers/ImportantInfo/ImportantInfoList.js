import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getAllImportantInfo } from '../../store/actions'

class ImportantInfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.getAllInfo();
    }

    componentDidMount() {
        document.getElementById("importantInfoTable").scrollIntoView();
    }

    render() {
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
        }, {
            Header: '',
            accessor: '_id',
            maxWidth: '100',
            Cell: props => <Link to={"/ImportantInfo/EditImportantInfo/" + props.value}>Edit</Link>
        }];

        return <div id="importantInfoTable"><ReactTable defaultPageSize={10} className="react-table-default" data={this.props.importantInfoList} columns={columns} /></div>
    }
}

const mapStateToProps = (state, ownProps) => {
    const { importantInfoList } = state.info
    return { importantInfoList };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllInfo: () => { dispatch(getAllImportantInfo()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportantInfoList)