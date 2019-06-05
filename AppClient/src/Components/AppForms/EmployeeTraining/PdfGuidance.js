import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import {ActivityIndicator, Alert, AsyncStorage, Linking, TouchableOpacity, View} from "react-native";
import axios from "axios";

export default class PdfGuidance extends Component {


    render() {
        return (
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require( "../../../Resources/list.png")} style={{height: 50, width: 50}}/>
                    <Body>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </Body>
                </Left>
                    </CardItem>
                </Card>
            );
        }

}
const styles = {
    title:{
        alignSelf: 'center',alignContent: 'center',fontWeight: 'bold',fontSize:15
    }

}