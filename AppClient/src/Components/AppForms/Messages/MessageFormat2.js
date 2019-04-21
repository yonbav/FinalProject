import React, { Component } from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';

export default class MessageFormat2 extends Component {
    render() {

        return (

            <TouchableOpacity onPress={()=>this.props.navigation.navigate('pdf',
            {url: this.props.url ,title: this.props.title , user: this.props.user})}>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text style={{alignSelf: 'center',alignContent: 'center',fontWeight:'bold',fontSize:20}}>תדריך יומי: {this.props.title} </Text>
                            </Body>
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