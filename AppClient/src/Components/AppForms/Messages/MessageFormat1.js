import React, { Component } from 'react';
import {Alert, AsyncStorage, Image, Linking, TouchableOpacity, View} from 'react-native';
import {Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Right } from 'native-base';
import {CheckBox} from "react-native-elements";
import axios from "axios";
export default class MessageFormat1 extends Component {

    constructor() {
        super();
        this.state = {
            checked: false,
        }
    }
    renderlink(){
        if(this.props.link !== ""){
            return(
                <TouchableOpacity onPress={()=> Linking.openURL(this.props.link)}>
                <CardItem>
                    <Text style={{alignSelf: 'center',color:'#2a2dff',alignContent: 'center',fontWeight: 'bold',fontSize:15}}>{this.props.link}</Text>

                </CardItem>
                </TouchableOpacity>
            );
        }
    }
    async Checkandpush() {
        const value = await AsyncStorage.getItem('id_token');
        axios.post('http://192.168.43.209:3000/Message/pushread', {
            id: this.props.id,
            _id: this.props.id1
        },{ headers: { token: value} })
            .then(result => {
                if (result.data.docs === 1) {
                    this.setState({
                        checked: true
                    })
                }
                else if(result.data.success === false){
                    Alert.alert(
                        'הודעת אבטחה',
                        'אין הרשאות נא פנה לנציג',
                    )
                }
            })

    }

    render() {

        return (

            <Card style={{flex: 0}}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://cdn0.iconfinder.com/data/icons/data-and-internet-communication-2/32/send_message_important-128.png'}} />
                        <Body>
                            <Text>{this.props.title}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />
                <CardItem>
                    <Body>
                        <Text>
                            {this.props.contect}
                        </Text>
                    </Body>
                </CardItem>
                {this.renderlink()}
                <CardItem>
                    <Left>
                        <Text note>{this.props.Date}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <CheckBox
                        center
                        title='אשר קריאה'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked}
                        onPress={() => this.Checkandpush()}
                    />
                </CardItem>
            </Card>

        );
    }
}