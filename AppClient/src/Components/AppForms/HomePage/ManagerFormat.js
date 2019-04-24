import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import {TouchableOpacity} from "react-native";

export default class ManagerFormat extends Component {

    render() {

        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Manager')}>
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require( "../../../Resources/Manager.jpg")} style={{height: 70, width: 70}}/>
                        <Body>
                            <Text style={{alignSelf: 'center',alignContent: 'center',fontWeight: 'bold'}}>{this.props.name}</Text>
                        </Body>
                    </Left>
                </CardItem>

            </Card>
            </TouchableOpacity>


        );
    }
}