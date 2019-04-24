import React, { Component } from 'react';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import {Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Right } from 'native-base';
export default class MessageFormat extends Component {
    renderlink(){
        if(this.props.link !== ""){
            return(
                <TouchableOpacity onPress={()=> Linking.openURL(this.props.link)}>
                    <CardItem>
                        <Text style={{alignSelf: 'center',color:'#2a2dff',alignContent: 'center',fontWeight: 'bold',fontSize:15}}>{this.props.link}</Text>
                    </CardItem>
                </TouchableOpacity>
            );
        }
    }
    render() {
        return (

                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: 'https://cdn0.iconfinder.com/data/icons/data-and-internet-communication-2/32/send_message_important-128.png'}} />
                                <Body>
                                <Text>{this.props.title}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                        />
                        <CardItem>
                            <Body>
                            <Text>
                                {this.props.contect}
                            </Text>
                            </Body>
                        </CardItem>
                        {this.renderlink()}
                        <CardItem>
                            <Left>
                                <Text note>{this.props.Date}</Text>
                            </Left>
                        </CardItem>
                    </Card>

        );
    }
}