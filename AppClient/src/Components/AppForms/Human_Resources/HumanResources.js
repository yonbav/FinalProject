import React,{Component} from 'react'
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux";
import Header from "../../common/Header";
import Button from 'react-native-button';

class HumanResources extends Component {



    render() {
        return (
            <View style={styles.BackStyle}>
                <View>
                    <Header name="עדכוני משא"/>
                </View>

                <View style = {styles.containerStyle}>
                    <Button
                        onPress={() => Actions.Birthdays()}
                        containerStyle ={styles.buttonStyleBack}
                        style={styles.buttonStyleText}>
                        ימי הולדת
                    </Button>


                </View>
                <View style = {styles.containerStyle}>
                    <Button
                        onPress={() => Actions.Birthdays()}
                        containerStyle ={styles.buttonStyleBack}
                        style={styles.buttonStyleText}>
                        חבר מביא חבר
                    </Button>
                    <Button
                        onPress={() => Actions.Birthdays()}
                        containerStyle ={styles.buttonStyleBack}
                        style={styles.buttonStyleText}>
                        תקנון מניעת הטרדה מינית
                    </Button>

                </View>
            </View>

        );
    }
}
const styles = {
    BackStyle: {
        paddingTop:100,
        backgroundColor: "#ffc68e",
        paddingBottom: 800
    },
    buttonStyleBack:{
        margin:5,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:200,
        borderWidth: 1,
        borderRadius:30,
        backgroundColor: "#fff",
        borderColor:'#FF7802',

    },
    buttonStyleText:{
        alignSelf: 'center',
        color:'#050002',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    containerStyle:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ffc68e',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#ffc68e',
        position: 'relative',
        margin: 10,

    },
    containerStyle2:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ffc68e',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ffc68e',
        position: 'relative',
        margin: 10,
        paddingLeft:20,
        paddingRight: 20

    }
}

export default HumanResources;
