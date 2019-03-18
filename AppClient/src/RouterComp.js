import React from 'react'
import {Alert, BackHandler, Image, TouchableOpacity, View,Text} from 'react-native'
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
import {Actions} from "react-native-router-flux";
import MessagesForm from "./Components/AppForms/Messages/MessagesForm";
import EmployeeTraining from "./Components/AppForms/EmployeeTraining/EmployeeTraining";
import ManagerTraining from "./Components/AppForms/ManagerTraining/ManagerTraining";

const onExitApp = () => {
    Alert.alert(
        'יציאה',
        'האם אתה רוצה לצאת מהאפליקציה?',
        [
            { text: 'לא', onPress: () => {} },
            { text: 'כן', onPress: () => BackHandler.exitApp() },
        ]
    );
    return true;
};

const RouterComp =() =>{

    return (

            <Router onExitApp={onExitApp} duration={200}>
                <Scene key ="root" hideNavBar>
                    <Scene key ="auth" hideNavBar type= "reset">
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

                        <Scene key="Birthdays"
                               component={Birthdays}
                               hideNavBar={false}
                               navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}
                        />
                        <Scene key="Messages"
                               component={MessagesForm}
                               hideNavBar={false}
                               navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}
                        />

                        <Scene key="EmployeeTraining"
                               component={EmployeeTraining}
                               hideNavBar={false}
                               navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}
                        />
                        <Scene key="ManagerTraining"
                               component={ManagerTraining}
                               hideNavBar={false}
                               navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}
                        />
                        <Scene key="pdf"
                               component={PdfView}
                               hideNavBar={false}
                               navigationBarStyle={[{paddingTop:10},{backgroundColor: "#ffc68e"}]}
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
const styles = {
    userMenu: {
        paddingTop: 35,
    },
    badge:{
        paddingTop:2,
        color: "#ff151f",
    }

};
export default RouterComp;