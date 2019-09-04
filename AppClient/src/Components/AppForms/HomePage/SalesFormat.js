import React, { Component } from 'react';
import {Image, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import API_URL from "../../../apiUrl";

export default class SalesFormat extends Component {
    render() {
        return (

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('pdf',
                {url: `${API_URL.SERVER_URL}${API_URL.PDF_FOLDER_NAME}${this.props.url}` ,
                    title: this.props.title})}>
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