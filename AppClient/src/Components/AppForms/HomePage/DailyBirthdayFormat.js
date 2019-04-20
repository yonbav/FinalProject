import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import GetDailyBirthdays from "./GetDailyBirthdays";

export default class DailyBirthdayFormat extends Component {

    render() {

        return (

            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require( "../../../Resources/DailyBirthdays.jpg")} style={{height: 70, width: 70}}/>
                        <Body>
                            <GetDailyBirthdays user={this.props.user}/>
                        </Body>
                    </Left>
                </CardItem>

            </Card>

        );
    }
}