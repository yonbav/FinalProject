import React from 'react'
import {Router,Scene} from 'react-native-router-flux';
import LoginForm from '../../ClientApp/src/Components/LoginForm';
import HomePage from '../../ClientApp/src/Components/HomePage';
import DailyBrif from '../../ClientApp/src/Components/AppForms/DailyBrif'
import {Actions} from "react-native-router-flux";


const RouterComp =() =>{

    return (

            <Router>
                <Scene key ="root" hideNavBar>
                    <Scene key ="auth" hideNavBar>
                    <Scene key="Login" component={LoginForm} title="LoginForm" />
                    </Scene>
                    <Scene key ="main" >
                    <Scene key="Home" component={HomePage} title=""  hideNavBar={true} />
                    <Scene key="DailyBrif"
                           component={DailyBrif}

                           title="תדריך יומי" hideNavBar={false}
                           navigationBarStyle={{paddingTop:10}

                    }/>
                    </Scene>

                </Scene>
            </Router>
        );

   };

export default RouterComp;