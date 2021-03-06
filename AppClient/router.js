import React from "react";
import {AsyncStorage, Platform, StatusBar} from "react-native";
import {
    StackNavigator,
    TabNavigator,
    SwitchNavigator
} from "react-navigation";

import LoginForm from "./src/Components/AppForms/LoginForm";
import HomePage from "./src/Components/AppForms/HomePage/HomePage";
import Profile from "./src/Components/AppForms/Profile/Profile";
import {createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';
import DailyBrif from "./src/Components/AppForms/DailyBrif/DailyBrif";
import PdfView from "./src/Components/AppForms/DailyBrif/PdfView";
import HumanResources from "./src/Components/AppForms/Human_Resources/HumanResources";
import Birthdays from "./src/Components/AppForms/Human_Resources/Birthdays";
import Jobs from "./src/Components/AppForms/Human_Resources/Jobs";
import importantinfo from "./src/Components/AppForms/important-info/importantinfo";
import EmployeeTraining from "./src/Components/AppForms/EmployeeTraining/EmployeeTraining";
import MessagesForm from "./src/Components/AppForms/Messages/MessagesForm";
import ChangePassword from "./src/Components/AppForms/Profile/ChangePassword";
import ManagerTraining from "./src/Components/AppForms/ManagerTraining/ManagerTraining";
import ForgetPassword from "./src/Components/AppForms/ForgetPassword/ForgetPassword";
import CodeVerify from "./src/Components/AppForms/ForgetPassword/CodeVerify";
import ForgetPasswordChange from "./src/Components/AppForms/ForgetPassword/ForgetPasswordChange";
import Minhal from "./src/Components/AppForms/EmployeeTraining/Minhal"
import Guidance from "./src/Components/AppForms/EmployeeTraining/guidance"


export const SignedOut = createStackNavigator({
    LoginForm: {
        screen: LoginForm,
        navigationOptions: {
            header: null,
        },
    },
    ForgetPassword: {
        screen: ForgetPassword,
        navigationOptions: {
            title: 'שכחתי סיסמה',
            headerTitleStyle : {textAlign: 'center',alignSelf:'center',color:"#fff",},
            headerStyle:{
                backgroundColor:'#ffc68d',
            },
        },
    },
    Code: {
        screen: CodeVerify,
        navigationOptions: {
            title: 'שכחתי סיסמה',
            headerTitleStyle : {textAlign: 'center',alignSelf:'center',color:"#fff",},
            headerStyle:{
                backgroundColor:'#ffc68d',
            },
        },
    },
    Change: {
        screen: ForgetPasswordChange,
        navigationOptions: {
            title: 'שנה סיסמה',
            headerTitleStyle : {textAlign: 'center',alignSelf:'center',color:"#fff",},
            headerStyle:{
                backgroundColor:'#ffc68d',
            },
        },
    },
}, {
    initialRouteName: 'LoginForm',
})
export const HomeP = createStackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            header: null,
        },
    },
    messages: {
        screen: MessagesForm,
        navigationOptions: {
            title: 'הודעות חשובות',
            headerTitleStyle : {textAlign: 'center',alignSelf:'center',color:"#fff",},
            headerStyle:{
                backgroundColor:'#ffc68d',
            },
        },
    },
    Manager: {
        screen: ManagerTraining,
        navigationOptions: {
            title: 'הדרכת מנהלים',
            headerTitleStyle : {textAlign: 'center',alignSelf:'center',color:"#fff",},
            headerStyle:{
                backgroundColor:'#ffc68d',
            },
        },
    },
    pdf: {
        screen: PdfView,
        navigationOptions: {
        },
    }
}, {
    initialRouteName: 'Home',
});
export const Pro = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null,
        },
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: {
            title: 'שנה סיסמה',
            headerTitleStyle : {textAlign: 'center',alignSelf:'center',color:"#fff",},
            headerStyle:{
                backgroundColor:'#ffc68d',
            },
        },
    }
}, {
    initialRouteName: 'Profile',
});
export const DailyB = createStackNavigator({
    Daily: {
        screen: DailyBrif,
        navigationOptions: {
            header: null,
        },
    },
    pdf: {
        screen: PdfView,
        navigationOptions: {
        },
    }
},{
    initialRouteName:'Daily',
});
export const HumanR = createStackNavigator({
    Human: {
        screen: HumanResources,
        navigationOptions: {
            header: null,
        },
    },
    Birthdays: {
        screen: Birthdays,
        navigationOptions: {
            title: 'ימי הולדת',
            headerTitleStyle : {textAlign: 'center',alignSelf:'center',color:"#fff",},
            headerStyle:{
                backgroundColor:'#ffc68d',
            },
        },
    },
    Jobs: {
        screen: Jobs,
        navigationOptions: {
            title: 'חבר מביא חבר',
            headerTitleStyle : {textAlign: 'center',alignSelf:'center',color:"#fff",},
            headerStyle:{
                backgroundColor:'#ffc68d',
            },
        },
    },
    pdf: {
        screen: PdfView,
        navigationOptions: {
        },
    }
},{
    initialRouteName:'Human',
});
export const Info = createStackNavigator({
    Info: {
        screen: importantinfo,
        navigationOptions: {
            header: null,
        },
    },
    Minhal: {
        screen: Minhal,
        navigationOptions: {
            title: 'תיקיית מנהלים',
            headerTitleStyle : {textAlign: 'center',alignSelf:'center',color:"#fff",},
            headerStyle:{
                backgroundColor:'#ffc68d',
            },
        },
    },
    pdf: {
        screen: PdfView,
        navigationOptions: {
        },
    }
},{
    initialRouteName:'Info',
});
export const Emp = createStackNavigator({
    Emp: {
        screen: EmployeeTraining,
        navigationOptions: {
            header: null,
        },
    },
    Guidance: {
        screen: Guidance,
        navigationOptions: {
            title: 'תיקיית הדרכות',
            headerTitleStyle : {textAlign: 'center',alignSelf:'center',color:"#fff",},
            headerStyle:{
                backgroundColor:'#ffc68d',
            },
        },
    },
    pdf: {
        screen: PdfView,
        navigationOptions: {
        },
    }
},{
    initialRouteName:'Emp',
});
export const SignedIn = createBottomTabNavigator({
    Home: {screen: HomeP,navigationOptions:{
            tabBarLabel: 'דף הבית',
            tabBarIcon: ({tintColor}) =>(
                <Ionicons name="ios-home" color={tintColor} size={24}/>
            )
        }
    },
    Daily: {screen: DailyB,navigationOptions:{
            tabBarLabel: 'תדריך יומי',
            tabBarIcon: ({tintColor}) =>(
                <Feather name="book-open" color={tintColor} size={24}/>
            )
        }},
    Human: {screen: HumanR,navigationOptions:{
            tabBarLabel: 'עדכוני משא',
            tabBarIcon: ({tintColor}) =>(
                <MaterialCommunityIcons name="update" color={tintColor} size={24}/>
            )
        }},
    Empl: {screen: Emp,navigationOptions:{
            tabBarLabel: 'הדרכה',
            tabBarIcon: ({tintColor}) =>(
                <MaterialCommunityIcons name="teach" color={tintColor} size={24}/>
            )
        }},
    Info: {screen: Info,navigationOptions:{
            tabBarLabel: 'מידע חשוב',
            tabBarIcon: ({tintColor}) =>(
                <Feather name="info" color={tintColor} size={24}/>
            )
        }},

    Profile: {screen: Pro,navigationOptions:{
            tabBarLabel: 'פרופיל',
            tabBarIcon: ({tintColor}) =>(
                <Ionicons name="ios-man" color={tintColor} size={24}/>
            )
        }}
},{
    initialRouteName:'Home',
    order:['Profile','Empl','Info','Human','Daily','Home'],
    tabBarOptions: {
        activeTintColor: '#ffc68d',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: '#fff',
        },
    }


});

export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn,
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut",
        }
    );
};
