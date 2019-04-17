import React,{Component} from 'react'
import {Text,View,Image,Keyboard, TouchableOpacity,FlatList} from "react-native";
import Applogo from "../../common/Applogo";
import Button from 'react-native-button';
import {Actions} from "react-native-router-flux";
import GetDailyBirthdays from "./GetDailyBirthdays";
import Messeges from "../Messages/Messeges";
import Sales from "./Sales";
import UsernameClick from "./UsernameClick";
import Mail from "./Mail";
import axios from "axios";
import { Permissions, Notifications } from 'expo';
import StyleApp from "../StyleApp"

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
        return fetch('http://192.168.1.34:3000/daily/registarnotification', {
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
        axios.post("http://192.168.1.34:3000/Message/unreadCount",{
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
    componentDidMount() {
        Keyboard.dismiss();
        this.registerForPushNotificationsAsync();

    }
    mixFunction=()=>{
        Actions.Messages({id: this.props.user.id,messages: this.state.num});
        this.getResponse(0);
    }
    renderManager(){
        if(this.props.user.authorization > 2)
        {
            return(<Button
                onPress={() => {Actions.ManagerTraining()}}
                containerStyle ={StyleApp.buttonStyleBackHome}
                style={StyleApp.buttonStyleText}>
                הדרכת מנהלים
            </Button>)
        }
    }
    _renderItem = () => (
        <Applogo/>
)


render() {
    return (
    <View style={StyleApp.BackStyle2}>

        <Messeges  id ={this.props.user.id} callback={this.getResponse.bind(this)}/>
        <Sales  callback={this.getResponse2.bind(this)}/>
            <View style={{flexDirection: 'row',justifyContent: 'space-between',padding: 5}}>
                <UsernameClick user={this.props.user}/>
                <TouchableOpacity onPress={()=>this.mixFunction()}>
                <Mail num={this.state.num}/>
                </TouchableOpacity>
            </View>
        <FlatList
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            data={this.state.stories}
            keyExtractor={(item) => item.toString()}
            renderItem={this._renderItem}
        />
        <Text style={StyleApp.labelStyle}>שלום {this.props.user.firstname},</Text>
        <View style = {StyleApp.containerStyleHome}>
            <Button
                onPress={() => Actions.DailyBrif({user: this.props.user})}
                containerStyle ={StyleApp.buttonStyleBackHome}
                style={StyleApp.buttonStyleText}>
                תדריך יומי
            </Button>
            <Button
                onPress={() =>
                    Actions.pdf({url: "http://192.168.1.34:3000/"+this.state.SalesData.image ,
                        title: "מבצעים"})}
                containerStyle ={StyleApp.buttonStyleBackHome}
                style={StyleApp.buttonStyleText}>
                מבצעים
            </Button>

        </View>
        <View style = {StyleApp.containerStyleHome}>
            <Button
                onPress={() => Actions.HumRes()}
                containerStyle ={StyleApp.buttonStyleBackHome}
                style={StyleApp.buttonStyleText}>
                עדכוני מש"א
            </Button>
            <Button
                onPress={() => Actions.Importantinfo()}
                containerStyle ={StyleApp.buttonStyleBackHome}
                style={StyleApp.buttonStyleText}>
                מידע חשוב
            </Button>

        </View>
        <View style = {StyleApp.containerStyleHome}>
            <Button
                onPress={() => Actions.EmployeeTraining()}
                containerStyle ={StyleApp.buttonStyleBackHome}
                style={StyleApp.buttonStyleText}>
                הדרכת עובדים
            </Button>
            {this.renderManager()}
        </View>
        <View style={[StyleApp.buttonStyleBack1,{width:400}]}>
            <GetDailyBirthdays user={this.props.user}/>
        </View>

    </View>

    );
};
}


export default HomePage;
