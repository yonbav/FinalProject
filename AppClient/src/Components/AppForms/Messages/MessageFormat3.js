import React, { Component } from 'react';
import {Image, TouchableOpacity} from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';

export default class MessageFormat3 extends Component {
    render() {
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('pdf',
                {url: this.props.url ,title: this.props.title , user: this.props.user})}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require("../../../Resources/newsbrief.jpg")} style={{height: 50, width: 50}}/>
                            <Body>
                                <Text style={{alignSelf: 'flex-start',alignContent: 'flex-start'}}> תדריך יומי: {this.props.title}</Text>
                            </Body>
                        </Left>
                    </CardItem>

                </Card>
            </TouchableOpacity>

        );
    }
}