import React, { Component } from 'react';
import Table from '../components/Table'
import LoginForm from '../components/LoginForm'
import EditBusinessDate from '../components/EditBusinessDate';
import Dialog from '../components/Dialog';

class Monitor extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div id="monitor">
                <Table/>
                <LoginForm/>
                <EditBusinessDate/>
                <Dialog/>
            </div>
        )
    }
}

export default Monitor;
