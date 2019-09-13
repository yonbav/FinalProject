import React, { Component } from 'react';
import {Alert, AsyncStorage, Image, TouchableOpacity} from 'react-native';
import {Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import axios from "axios";
import {CheckBox} from "react-native-elements";
import * as WebBrowser from "expo-web-browser";

export default class MessageFormat2 extends Component {
    constructor() {
        super();
        this.state = {
            checked: false,
        }
        this.GetData = this.GetData.bind(this);
        this.getResponse = this.getResponse.bind(this)
    }
    getResponse(result){
        this.setState({
            checked: result
        });
    }
    componentDidMount() {
        this.GetData();
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.GetData();
            }
        );
    }
    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    async GetData() {
        const value = await AsyncStorage.getItem('id_token');
        axios.post('http://185.56.74.46:3000/daily/unread', {
            title: this.props.title,
            id: this.props.user.id
        },{ headers: { token: value} })
            .then(result => {
                if (result.data.docs === null) {
                    this.getResponse(true)
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
            <TouchableOpacity onPress={async () => await WebBrowser.openBrowserAsync(this.props.url)}>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text style={{alignSelf: 'center',alignContent: 'center',fontWeight:'bold',fontSize:20}}>תדריך יומי: {this.props.title} </Text>
                            </Body>
                            <CheckBox
                                checked={this.state.checked}
                            />
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source = {require('../../../Resources/newsbrief.jpg')} resizeMode="stretch" style={{height: 110, width: 20, flex: 1}}/>
                    </CardItem>

                </Card>
            </TouchableOpacity>

        );
    }
}