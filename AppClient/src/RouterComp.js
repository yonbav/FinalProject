import React from 'react'
import {Router,Scene} from 'react-native-router-flux';
import LoginForm from './Components/AppForms/LoginForm';
import HomePage from './Components/AppForms/HomePage/HomePage';
import DailyBrif from './Components/AppForms/DailyBrif/DailyBrif'
import Profile from "./Components/AppForms/Profile/Profile";
import ChangePassword from "./Components/AppForms/Profile/ChangePassword";
import PdfView from "./Components/AppForms/DailyBrif/PdfView";
import importantinfo from "./Components/AppForms/important-info/importantinfo";
import HumanResources from "./Components/AppForms/Human_Resources/HumanResources";
import Birthdays from "./Components/AppForms/Human_Resources/Birthdays";
import Perk from "./Components/AppForms/Perk/Perk";


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
                        <Scene key="Importantinfo"
                               component={importantinfo}
                               hideNavBar={false}
                               navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}
                        />
                        <Scene key="Profile"
                               component={Profile}
                               hideNavBar={false}
                               />
                        <Scene key="HumRes"
                               component={HumanResources}
                               hideNavBar={false}
                               navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}
                        />
                        <Scene key="Perk"
                               component={Perk}
                               hideNavBar={false}
                               navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}
                        />
                        <Scene key="Birthdays"
                               component={Birthdays}
                               hideNavBar={false}
                               navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}
                        />
                        <Scene key="pdf"
                               component={PdfView}
                               hideNavBar={false}
                        />
                        <Scene key="ChangePassword"
                               component={ChangePassword}
                               hideNavBar={false}
                               navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}/>

                    </Scene>

                </Scene>
            </Router>
        );

   };

export default RouterComp;