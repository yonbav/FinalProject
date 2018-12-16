import React from 'react'
import {Scene,Router} from 'react-native-router-flux';
import LoginFrom from "./Components/LoginForm";



const RouterComponent = () => {
    return (
    <Router>
            <Scene key="login" component={LoginFrom} title="Please Login"/>
    </Router>
 );
};
export default RouterComponent;