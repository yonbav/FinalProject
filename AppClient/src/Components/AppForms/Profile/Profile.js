import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Keyboard
} from 'react-native';
import axios from "axios";
import Footer from "../../common/Footer";
import {connect} from "react-redux";
import deviceStorage from "../../../Services/deviceStorage";
class Profile extends Component {

    renderImage(){
        if (this.props.user.gender === "male")
        {
            return <Image style={styles.avatar} source={require('../../../Resources/Profile.png')}/>
        }
        return <Image style={styles.avatar} source={require('../../../Resources/Profile2.png')}/>

    }
    changePassword(navigation)
    {
        axios.post("http://192.168.1.34:3000/Auth/CheckToken",{
            id: this.props.user.id,
            token: this.props.user.token,
        })
            .then((res)=> {
                res = res.data;
                if (res.success === true) {
                    navigation.navigate('ChangePassword')
                }
                else{this.onSignOut(this.props.navigation)}
            })

    }
    onSignOut = async (navigation) => {
        await deviceStorage.deleteJWT();
        navigation.navigate({routeName:"SignedOut"})
    };

    EmploeeType(){
        if(this.props.user.authorization === '1' || this.props.user.authorization === '2'){
            if (this.props.user.gender === "male"){
                return <Text style={styles.description}>עובד</Text>;
            }
            else{
                return <Text style={styles.description}>עובדת</Text>;
            }
        }
        else if(this.props.user.authorization === '3' || this.props.user.authorization === '4')
            if (this.props.user.gender === "male"){
                return <Text style={styles.description}>מנהל</Text>;
            }
            else{
                return <Text style={styles.description}>מנהלת</Text>;
            }
        else
            return <Text style={styles.description}>ראש מטה</Text>

    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:15}}>
                    <View style={styles.header}></View>
                    {this.renderImage()}
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>{this.props.user.firstname} {this.props.user.lastname}</Text>
                            <Text style={styles.info}>{this.props.user.birthday}</Text>
                            <Text style={styles.description}>
                                {this.EmploeeType()}{"\n"}
                                {this.props.user.phone_number}{"\n"}
                                {this.props.user.branch}

                            </Text>

                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.changePassword(this.props.navigation)}
                            >
                                <Text>שינוי סיסמה</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onSignOut(this.props.navigation)}>
                                <Text>התנתקות</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <Footer des = "במקרה שפרטיך שונו אנא לפנות למייל " mail="kravitz@gmail.com"/>
            </View>


        );
    }
}
const mapStateToProps =  state =>{
    return {
        user: state.auth.user
    };
};

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#ffc68e",
        height:200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
    },

    body:{
        marginTop:40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
    },
    info:{
        fontSize:16,
        color: "#ffc68e",
        marginTop:10
    },
    description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#ffc68e",
    },

});
export default connect(mapStateToProps)(Profile);
