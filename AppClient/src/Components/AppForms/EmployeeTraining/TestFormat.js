import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import {ActivityIndicator, Alert, AsyncStorage, Linking, TouchableOpacity} from "react-native";
import axios from "axios";

export default class TestFormat extends Component {
    constructor() {
        super();
        this.state = {
            url: null

        };
    }
    componentDidMount() {
        this.GetData();
    }
    async GetData(){
        const value = await AsyncStorage.getItem('id_token');
        axios.get('http://192.168.43.209:3000/Link/KnowledgeTest',{ headers: { token: value} })
            .then(result => {
                if(result.data.success === false){
                    Alert.alert(
                        'הודעת אבטחה',
                        'אין הרשאות נא פנה לנציג',
                    )
                }else {
                    this.setState({
                        url: result.data.url
                    });
                }
            })
    }

    render() {
        if(this.state.url !== null) {
            return (
                <TouchableOpacity onPress={() => Linking.openURL(this.state.url)}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require("../../../Resources/Link.jpg")}
                                           style={{height: 50, width: 50}}/>
                                <Body>
                                    <Text style={{
                                        alignSelf: 'center',
                                        alignContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 15
                                    }}>{this.props.name}</Text>
                                </Body>
                            </Left>
                        </CardItem>

                    </Card>
                </TouchableOpacity>


            );
        }
        else{
            return(
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require("../../../Resources/Link.jpg")}
                                       style={{height: 50, width: 50}}/>
                            <Body>
                                <Text style={{
                                    alignSelf: 'center',
                                    alignContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>{this.props.name}</Text>
                            </Body>
                        </Left>
                    </CardItem>

                </Card>
            );
        }
    }
}