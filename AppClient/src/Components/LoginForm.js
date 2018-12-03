import React ,{Component} from 'react';
import {connect} from 'react-redux'
import {emailChanged} from "../actions/actions";
import Card from "./common/Card"
import CardSection from "./common/CardSection"
import Input from "./common/Input"
import Header from "./common/Header"
import {Text,View ,Button} from 'react-native';



class LoginForm extends Component{
    press() {
        console.log("pressed")
    }

    onEmailChanged(text){
        this.props.emailChanged(text);
    }
    render() {
        console.log("Yopedu")
        return (
            <View>
            <Header name="Login"/>
            <Card>
                <CardSection>
                    <Input
                    label="Email"
                   placeholder="email@gmail.com"
                    onChangeText={this.onEmailChanged.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                    />
                </CardSection>

                <CardSection>
                    <Button
                        onPress={this.press}
                        title="Login"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </CardSection>

            </Card>
            </View>
        );
    }
}

export default connect(null,{emailChanged})(LoginForm);
