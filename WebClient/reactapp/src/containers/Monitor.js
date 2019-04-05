import React, { Component } from 'react';
import LoginForm from '../components/LoginForm'
import Dialog from '../components/Dialog';

class Monitor extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div id="monitor">
                <LoginForm/>
                <Dialog/>
            </div>
        )
    }
}

export default Monitor;
