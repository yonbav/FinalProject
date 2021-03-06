import React, { Component } from 'react';
import {Image, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import API_URL from "../../../apiUrl";
import * as WebBrowser from "expo-web-browser";

export default class SalesFormat extends Component {
    render() {
        return (

            <TouchableOpacity onPress={async () => await WebBrowser.openBrowserAsync(`${API_URL.SERVER_URL}${API_URL.PDF_FOLDER_NAME}${this.props.url}`)}>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text style={{alignSelf: 'center',alignContent: 'center',fontWeight:'bold',fontSize:20}}>{this.props.title} </Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source = {require('../../../Resources/Sales.jpg')} style={{height: 200, width: 20, flex: 1}}/>
                    </CardItem>

                </Card>
            </TouchableOpacity>

        );
    }
}