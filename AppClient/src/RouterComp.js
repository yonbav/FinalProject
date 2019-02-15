import React from 'react'
import {Router,Scene} from 'react-native-router-flux';
import LoginForm from '../src/Components/LoginForm';
import HomePage from '../src/Components/HomePage';
import DailyBrif from '../src/Components/AppForms/DailyBrif'
import Profile from "./Components/AppForms/Profile";
import ChangePassword from "./Components/ChangePassword";


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

                            hideNavBar={false}
                           navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}
                    />
                        <Scene key="Profile"
                               component={Profile}
                               hideNavBar={false}
                               />
                        <Scene key="ChangePassword"
                               component={ChangePassword}
                               hideNavBar={false}
                               navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}                        />

                    </Scene>

                </Scene>
            </Router>
        );

   };

export default RouterComp;