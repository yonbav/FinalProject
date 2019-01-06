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
                    <ActivityIndicator size="large" color="#000" />
                </View>
        }
        else {
            return <TouchableOpacity style={styles.buttonStyleBack} onPress={this.onPressButton.bind(this)}>
                    <Text style={styles.buttonStyleText}> התחברות </Text>
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
    }


    render() {
        return (
            <View style={styles.BackStyle}>
<Applogo/>

                <View style={styles.LoginStyle}>
                <Card>
                    <CardSection>
                        <Input
                            label=<Image source = {require('../Resources/user.png')}/>
                        placeholder="ת.ז"
                            onChangeText={this.onEmailChanged.bind(this)}
                            value={this.props.email}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            secureTextEntry
                            label=<Image source = {require('../Resources/lock.png')}/>
                            placeholder="סיסמא"
                            onChangeText={this.onPasswordChanged.bind(this)}
                            value={this.props.password}
                        />
                    </CardSection>
                    {this.renderError()}
                    <View style={styles.containerStyle}>
                    {this.renderButton()}
                    </View>


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
        loading: state.auth.loading,
        user: state.auth.user

    };
};
const styles = {
    LoginStyle: {
        paddingTop: 60,
    },
    BackStyle: {
        backgroundColor: "#ffc68e",
        paddingBottom: 330
    },
    buttonStyleBack:{
        flex:1,
        alignSelf: 'stretch',
        backgroundColor: '#FF7802',
        borderRadius: 5,
        borderWidth: 1,
        borderColor:'#000',
        marginLeft: 5,
        marginRight: 5
    },
    buttonStyleText:{
        alignSelf: 'center',
        color:'#000',
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
    },
    containerStyle:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ffc68e',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ffc68e',
        position: 'relative'

    }
}

export default connect(mapStateToProps,{emailChanged,passwordChanged,loginuser})(LoginForm);
