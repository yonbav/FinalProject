import React, { Component } from 'react';
import LoginForm from '../components/LoginForm'

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    
    componentDidMount() {
        window.scroll(0,0);
    }

    render() {

        return (
            <div id="home">
                <LoginForm/>
                <div> home </div>
            </div>
        )
    }
}

export default Home;
