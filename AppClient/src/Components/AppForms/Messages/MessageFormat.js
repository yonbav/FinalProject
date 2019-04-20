import React, { Component } from 'react';
import { Image,View } from 'react-native';
import {Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Right } from 'native-base';
export default class MessageFormat extends Component {
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
                        <CardItem>
                            <Left>
                                <Text note>{this.props.Date}</Text>
                            </Left>
                        </CardItem>
                    </Card>

        );
    }
}