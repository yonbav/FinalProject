import React,{Component} from 'react'
import {Text,View,Image,Keyboard, TouchableOpacity,FlatList,ScrollView} from "react-native";
import Messeges from "../Messages/Messeges";
import Sales from "./Sales";
import Mail from "./Mail";
import axios from "axios";
import {Notifications} from 'expo';
import {connect} from "react-redux";
import {Header} from "react-native-elements"
import SalesFormat from "./SalesFormat";
import DailyBirthdayFormat from "./DailyBirthdayFormat";
import ManagerFormat from "./ManagerFormat";
import * as Permissions from "expo-permissions"

class HomePage extends Component{
    async registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();

        // POST the token to your backend server from where you can retrieve it to send push notifications.
        return fetch('http://185.56.74.46:3000/daily/registarnotification', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: {
                    value: token,
                },
                user: {
                    username: this.props.user.firstname,
                },
            }),
        });
    }
    constructor() {
        super();
        this.state = {
            num: 0,
            SalesData: [],
            stories: [{id: 1}],
            isFetching:false
        };
        this.getResponse = this.getResponse.bind(this);
        this.getResponse2 = this.getResponse2.bind(this);
    }
    async getResponse(result) {
        await this.setState({
            num: result
        });
    }
    getResponse2(result){
        this.setState({
            SalesData: result
        });
    }
    GetData=()=> {
        axios.post("http://185.56.74.46:3000/Message/unreadCount",{
            id: this.props.user.id
        }).then((res)=> {
            this.setState({num:res.data.docs})
        })
    };
    onRefresh(){
        this.setState({isFetching:true})
        {this.GetData()}
        this.setState({isFetching:false})

    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
        Notifications.removeListener();
    }
    componentDidMount() {
        Keyboard.dismiss();
        this.registerForPushNotificationsAsync();
        this.GetData();
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.GetData();
            }
        );
        Notifications.addListener(this.handleNotification);

    }
    handleNotification = ({ origin, data })=>{
        if(data.withSome === 'Message'){
            this.props.navigation.navigate('messages',{id: this.props.user.id,messages: this.state.num});
        }
        else if(data.withSome === 'Daily'){
            this.props.navigation.navigate('Daily');
        }
    }
    mixFunction=()=>{
        this.props.navigation.navigate('messages',{id: this.props.user.id,messages: this.state.num})
    }
    renderManager(){
        if(this.props.user.authorization > 2)
        {
            return( <ManagerFormat name="הדרכת מנהלים" navigation={this.props.navigation}/>)
        }
    }
    _renderItem = () => (
        <View>
            <Text style={styles.labelStyle}>שלום {this.props.user.firstname},</Text>
            <SalesFormat url={this.state.SalesData.image} title="מבצעים" navigation={this.props.navigation}/>
            {this.renderManager()}
                <DailyBirthdayFormat  user={this.props.user}/>
        </View>

)



render() {
    return (
    <View style={styles.BackStyle}>

        <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            centerComponent={<Image style={{width: 150, height: 50}} source = {require('../../../Resources/Logo.png')}/>}
            rightComponent={ <TouchableOpacity onPress={()=> {this.mixFunction()}}><Mail num={this.state.num}/></TouchableOpacity>}
            containerStyle={{
                backgroundColor: '#F58220',
                justifyContent: 'space-around',
                height: 100
            }}
        />
        <Messeges  id ={this.props.user.id} callback={this.getResponse.bind(this)}/>
        <Sales  callback={this.getResponse2.bind(this)}/>
        <FlatList
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            data={this.state.stories}
            keyExtractor={(item) => item.toString()}
            renderItem={this._renderItem}
        />
    </View>

    );
};
}


const mapStateToProps =  state =>{
    return {
        user: state.auth.user
    };
};
const styles = {
    BackStyle:{
        backgroundColor: "#ffc68e",
        flex:1
    },
    labelStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#1c000b',
        alignSelf:'flex-start',
        marginTop: 5,
        justifyContent: 'space-between',
        paddingRight: 15
    },
}
export default connect(mapStateToProps)(HomePage);