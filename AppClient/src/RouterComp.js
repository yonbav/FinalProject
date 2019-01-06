import React from 'react'
import {Router,Scene} from 'react-native-router-flux';
import LoginForm from './Components/LoginForm';
import HomePage from './Components/HomePage';
import {Image, View} from "react-native";
import Applogo from "./Components/common/Applogo";

const RouterComp =() =>{

    return (

            <Router>
                <Scene key ="root" hideNavBar>
                    <Scene key ="auth" hideNavBar>
                    <Scene key="Login" component={LoginForm} title="LoginForm" />
                    </Scene>
                    <Scene key ="main" >
                    <Scene key="Home" component={HomePage} title="HomePage"  hideNavBar />
                    </Scene>
                </Scene>
            </Router>
        );

   };

export default RouterComp;