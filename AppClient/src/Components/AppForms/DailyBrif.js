import React,{Component} from 'react'
import {BackHandler, Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import Header from "../common/Header";

class DailyBrif extends Component {

    componentDidMount() {
        Keyboard.dismiss()
    };

    renderButtons() {
        return initialArr.map((item) => {
            if(item ===initialArr[0]) {
                return (
                    <View key={item.id} style={styles.containerStyle}>

                        <TouchableOpacity key={item.id} style={[styles.buttonStyleBack,{width:350}]} onPress={() => Actions.pdf()}>
                            <Text style={styles.buttonStyleText}> {item.text}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }
            else{
                return (
                    <View key={item.id} style={styles.containerStyle}>

                        <TouchableOpacity key={item.id} style={[styles.buttonStyleBack,{width:250}]} onPress={() => Actions.pdf()}>
                            <Text style={styles.buttonStyleText}> {item.text}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }

        });

    }

    render() {
        return (
            <View style={styles.BackStyle}>
                <View>
                <Header name="תדריך יומי"/>
                </View>
                {this.renderButtons()}
            </View>

        );
    }
}
const initialArr =[{
    id:1,
    text: "7.9",
},
    {
        id:2,
        text: "6.9",
    },
    {
        id:3,
        text: "5.9",
    },
    {
        id:4,
        text: "4.9",    },
    {
        id:5,
        text: "3.9",    },
    {
        id:6,
        text: "2.9",    },
    {
        id:7,
        text: "1.9",    },
];
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
        width:250,
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

export default DailyBrif;
