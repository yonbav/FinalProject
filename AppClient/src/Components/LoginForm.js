import React ,{Component} from 'react';
import {connect} from 'react-redux'
import {emailChanged, passwordChanged} from "../actions/actions";
import Card from "./common/Card"
import CardSection from "./common/CardSection"
import Input from "./common/Input"
import {Text,View , TouchableOpacity,Image} from 'react-native';


class LoginForm extends Component{



    onEmailChanged(text){
        this.props.emailChanged(text);
    }

    onPasswordChanged(text){
        this.props.passwordChanged(text);
    }

    onPressButton() {
        console.log(this.props.email);

        fetch('http://10.160.2.181:3000/get_birthdays',{
            method:'POST',
            headers:{
              'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                email: this.props.email,
                password: this.props.password,

            }),
        }).then((response)=> response.json())
            .then((res)=> {
            if(res.success === true)
            {
                console.log("aaaaaa");
            }
            else
            {
                console.log("nnnnnnn");

            }
        });
        console.log("pressed");
    }

    render() {
        return (
            <View style={styles.BackStyle}>
             <View style={styles.ImageStyle}>
                <Image source = {require('../Resources/Logo.jpeg')}/>
             </View>
            <View style={styles.LoginStyle}>
                <Card>
                    <CardSection>
                        <Input
                            label="Email"
                            placeholder="email@gmail.com"
                            onChangeText={this.onEmailChanged.bind(this)}
                            value={this.props.email}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            secureTextEntry
                            label="Password"
                            placeholder="password"
                            onChangeText={this.onPasswordChanged.bind(this)}
                            value={this.props.password}
                        />
                    </CardSection>

                    <CardSection>
                            <TouchableOpacity style={styles.buttonStyleBack} onPress={this.onPressButton.bind(this)}>
                                <Text style={styles.buttonStyleText}> Login </Text>
                            </TouchableOpacity>
                    </CardSection>


                </Card>
            </View>
            </View>
        );
    }
}

const mapStateToProps =  state =>{
    return {
        email: state.auth.email,
        password: state.auth.password
    };
};
const styles = {
    LoginStyle: {
        paddingTop: 80,
    },
    BackStyle: {
        backgroundColor: "#FF7802",
        paddingBottom: 300
    },
    buttonStyleBack:{
        flex:1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor:'#007aff',
        marginLeft: 5,
        marginRight: 5
    },
    buttonStyleText:{
        alignSelf: 'center',
        color:'#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    ImageStyle:{
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 35
    }
}

export default connect(mapStateToProps,{emailChanged,passwordChanged})(LoginForm);
