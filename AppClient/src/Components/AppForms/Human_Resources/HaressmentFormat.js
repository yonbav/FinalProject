import React, { Component } from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';

export default class HaressmentFormat extends Component {
    render() {

        return (

            <TouchableOpacity onPress={()=>this.props.navigation.navigate('pdf',
                {url: this.props.url ,title: this.props.title})}>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text style={{alignSelf: 'center',alignContent: 'center',fontWeight:'bold',fontSize:20}}>{this.props.title} </Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source = {require('../../../Resources/reg.jpg')} resizeMode="stretch" style={{height: 150, width: 20, flex: 1}}/>
                    </CardItem>

                </Card>
            </TouchableOpacity>

        );
    }
}