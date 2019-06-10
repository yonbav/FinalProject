import React ,{Component} from 'react';
import Card from "../../common/Card"
import CardSection from "../../common/CardSection"
import Input from "../../common/Input"
import {Text, View, TouchableOpacity, Image, ActivityIndicator, Alert, Keyboard, AsyncStorage} from 'react-native';
import {connect} from "react-redux";
import {loginuser} from "../../actions/actions";
import axios from 'axios';
import Header from "../../common/Header";



class ChangePassword extends Component{

    constructor() {
        super();
        this.state ={
            password: "",
            password1: "",
            password2: "",
            equal: ""

        }
        this.handlechangetext = this.handlechangetext.bind(this);
        this.handlechangetext1 = this.handlechangetext1.bind(this);
        this.handlechangetext2 = this.handlechangetext2.bind(this);
        this.onPressButton = this.onPressButton.bind(this);


    }
    handlechangetext(newText) {
        this.setState({
            password: newText
        })
    }
    handlechangetext1(newText) {
        this.setState({
            password1: newText
        })
    }
    handlechangetext2(newText) {
        this.setState({
            password2: newText
        })
    }
    async onPressButton() {
        Keyboard.dismiss();
        const value = await AsyncStorage.getItem('id_token');

        if (this.state.password1 === this.state.password2) {
            axios.patch('http://185.56.74.46:3000/user/changepassword/' + this.props.user._id, {
                Oldpassword: this.state.password,
                Newpassword: this.state.password1,
            },{ headers: { token: value} }).then((res) => {
                if (res.data.success === true) {
                    this.props.navigation.goBack();
                    this.setState({
                        equal: ""
                    })
                }else if(res.data.success === "false"){
                    Alert.alert(
                        'הודעת אבטחה',
                        'אין הרשאות נא פנה לנציג',
                    )
                }
                else {
                    this.setState({
                        equal: "הסיסמאות אינן תואמות"
                    })
                }

            })

        } else {
            this.setState({
                equal: "הסיסמאות אינן תואמות"
            })
        }
    }



    render() {
        return (
            <View style={styles.BackStyle}>

                <View style={styles.LoginStyle}>
                    <Card>
                        <CardSection>
                            <Input
                                label=<Image source = {require('../../../Resources/lock.png')}/>
                            placeholder="סיסמא ישנה"
                            value={this.state.password}
                            onChangeText={this.handlechangetext}

                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                label=<Image source = {require('../../../Resources/lock.png')}/>
                            placeholder="סיסמא חדשה"
                            value={this.state.password1}
                            onChangeText={this.handlechangetext1}

                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                secureTextEntry
                                label=<Image source = {require('../../../Resources/lock.png')}/>
                            placeholder="חזור על הסיסמא החדשה בשנית"
                            value={this.state.password2}
                            onChangeText={this.handlechangetext2}
                            />
                        </CardSection>
                            <Text style ={styles.ErrorStyle}>
                                {this.state.equal}
                            </Text>
                        <View style={styles.containerStyle}>
                            <TouchableOpacity style={styles.buttonStyleBack} onPress={this.onPressButton}>
                                <Text style={styles.buttonStyleText}> שנה סיסמא </Text>
                            </TouchableOpacity>
                        </View>


                    </Card>
                </View>
            </View>
        );
    }
}

const mapStateToProps =  state =>{
    return {
        user: state.auth.user
    };
};
const styles = {
    LoginStyle: {
        paddingTop: 80,
    },
    textStyle: {
        fontSize: 30,
        color: 'orange',
        fontWeight: 'bold',
        paddingBottom:5,
    },
    BackStyle: {
        backgroundColor: "#ffc68e",
        flex:1
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
};
export default connect(mapStateToProps,{loginuser})(ChangePassword);

