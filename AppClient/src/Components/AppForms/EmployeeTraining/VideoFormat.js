import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import {Linking, TouchableOpacity} from "react-native";

export default class VideoFormat extends Component {

    render() {

        return (
            <TouchableOpacity onPress={()=> Linking.openURL('https://www.youtube.com/user/kravtzweb')}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require( "../../../Resources/Video.png")} style={{height: 50, width: 50}}/>
                            <Body>
                                <Text style={{alignSelf: 'center',alignContent: 'center',fontWeight: 'bold',fontSize:15}}>{this.props.name}</Text>
                            </Body>
                        </Left>
                    </CardItem>

                </Card>
            </TouchableOpacity>


        );
    }
}