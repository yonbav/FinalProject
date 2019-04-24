import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import {ActivityIndicator, Linking, TouchableOpacity} from "react-native";
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
    GetData(){
        axios.get('http://192.168.1.34:3000/Link/KnowledgeTest')
            .then(result => {
                this.setState({
                    url: result.data.url
                });
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