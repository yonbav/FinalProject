import React ,{Component} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View,Image} from 'react-native';
import axios from 'axios/index';
import Header from "../../common/Header";
import Card from "../../common/Card";
import CardSection from "../../common/CardSection";
import Input from "../../common/Input";
import {Actions} from "react-native-router-flux/index";



class CodeVerify extends Component{
    constructor() {
        super();
        this.state = {
            codeinput:"",
            equal: "",
            loading:false

        };
        this.onPressButton = this.onPressButton.bind(this);
        this.handleCode = this.handleCode.bind(this);
    }
    handleCode(newText) {
        this.setState({
            codeinput: newText
        })
    }

    onPressButton() {
        this.setState({
            loading: true});
        axios.post('http://192.168.1.34:3000/Auth/verifycode',{
            code: this.state.codeinput,
            mail: this.state.mailinput
        }).then(result => {
            if(result.data.success !== false)
            {
                this.setState({
                    loading:false
                });
                Actions.ForgetPasswordChange({user: result.data});
            }
            else{
                this.setState({
                    equal:"אירעה שגיאה",
                loading:false})
            }
        })

    }
    renderSubmit()
    {
        if(this.state.loading === false){
            return ( <View style={styles.containerStyle}><TouchableOpacity style={styles.buttonStyleBack} onPress={this.onPressButton}>
                <Text style={styles.buttonStyleText}> אשר </Text>
            </TouchableOpacity>
            </View>)
        }else{
            return (<View style={styles.containerStyle}><View style={styles.buttonStyleBack}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
                </View>
            )
        }

    }

    render() {
            return (

                <View style={styles.BackStyle}>
                    <View style={{marginTop: 100}}>
                        <Header name="קוד לשחזור"/>
                    </View>
                    <View style={styles.LoginStyle}>
                        <Card>
                            <CardSection>
                                <Input
                                    label=<Image source = {require('../../../Resources/lock.png')}/>
                                placeholder="הכנס קוד"
                                value={this.state.codeinput}
                                onChangeText={this.handleCode}
                                />
                            </CardSection>
                            <Text style ={styles.ErrorStyle}>
                                {this.state.equal}
                            </Text>
                            {this.renderSubmit()}
                        </Card>
                    </View>
                </View>
            );

    }
};

const styles = {
    LoginStyle: {
        paddingTop: 100,
    },
    textStyle: {
        fontSize: 30,
        color: 'orange',
        fontWeight: 'bold',
        paddingBottom:5,
    },
    BackStyle: {
        backgroundColor: "#ffc68e",
        paddingBottom: 560
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
export default CodeVerify;
