import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';

export default class CardJobFormat extends Component {

    render() {

        return (

            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require( "../../Resources/Job.jpg")} style={{height: 50, width: 50}}/>
                        <Body>

                            <Text style={{alignSelf: 'flex-start',alignContent: 'flex-start'}}>{this.props.title}</Text>
                            <Text style={{alignSelf: 'flex-end',alignContent: 'flex-end'}}>{this.props.num} ש"ח </Text>

                        </Body>
                    </Left>
                </CardItem>

            </Card>

        );
    }
}