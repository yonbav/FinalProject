import React ,{Component} from 'react';
import {connect} from 'react-redux'
import {emailChanged, passwordChanged,loginuser} from "./actions/actions";
import Card from "./common/Card"
import CardSection from "./common/CardSection"
import Input from "./common/Input"
import {Text,View , TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import Applogo from "./common/Applogo";


class LoginForm extends Component{



    onEmailChanged(text){
        this.props.emailChanged(text);
    }

    onPasswordChanged(text){
        this.props.passwordChanged(text);
    }

    onPressButton() {
        this.props.loginuser(this.props.email,this.props.password);
    }
    renderButton()
    {
        if(this.props.loading)
        {
                return  <View style={styles.buttonStyleBack}>
                    <ActivityIndicator size="large" color="#FF7802" />
                </View>
        }
        else {
            return <TouchableOpacity style={styles.buttonStyleBack} onPress={this.onPressButton.bind(this)}>
                    <Text style={styles.buttonStyleText}> Login </Text>
                </TouchableOpacity>

        }
    }
    renderError(){
        if (this.props.error)
        {
            return <View>
                <Text style ={styles.ErrorStyle}>
                    {this.props.error}
                </Text>
            </View>
        }
        else
        {
            return <View>
                <Text style ={styles.ErrorStyle}>
                    {this.props.success}
                </Text>
            </View>
        }

    }
    render() {
        return (
            <View style={styles.BackStyle}>
<Applogo/>
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
                    {this.renderError()}
                    <CardSection>
                    {this.renderButton()}
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
        password: state.auth.password,
        error: state.auth.error,
        success: state.auth.success,
        loading: state.auth.loading


    };
};
const styles = {
    LoginStyle: {
        paddingTop: 60,
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
        paddingTop: 15
    },
    ErrorStyle:{
        fontSize: 20,
        alignSelf:'center',
        color:'red'
    }
}

export default connect(mapStateToProps,{emailChanged,passwordChanged,loginuser})(LoginForm);
