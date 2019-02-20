import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Keyboard, BackHandler
} from 'react-native';
import {connect} from "react-redux";
import {loginuser} from "../../actions/actions";
import {Actions} from "react-native-router-flux";
import Button from "../HomePage/HomePage";

class Profile extends Component {
    componentDidMount() {
        Keyboard.dismiss();
    }
    renderImage(){
        if (this.props.user.gender == "male")
        {
            return <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        }
        return <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar3.png'}}/>

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}></View>
                {this.renderImage()}
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{this.props.user.firstname} {this.props.user.lastname}</Text>
                        <Text style={styles.info}>{this.props.user.birthday}</Text>
                        <Text style={styles.description}>{this.props.user.email}{"\n"}
                            {this.props.user.phone_number}{"\n"}
                            {this.props.user.branch}

                        </Text>

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.ChangePassword()}
                        >
                            <Text>שינוי סיסמה</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.auth()}>
                            <Text>התנתקות</Text>
                        </TouchableOpacity>
                    </View>
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
export default connect(mapStateToProps,{loginuser})(Profile);

