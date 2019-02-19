import React,{Component} from 'react'
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux";
import Header from "../../common/Header";

class HumanResources extends Component {

    renderButtons() {

        return initialArr.map((item) => {
            return (
                <View key={item.id} style={styles.containerStyle}>

                    <TouchableOpacity key={item.id} style={[styles.buttonStyleBack,{width:220}]} onPress={() => Actions.Birthdays()}>
                        <Text style={styles.buttonStyleText}> {item.text}</Text>
                    </TouchableOpacity>
                </View>
            );

        });

    }

    render() {
        return (
            <View style={styles.BackStyle}>
                <View>
                    <Header name="עדכוני משא"/>
                </View>
                {this.renderButtons()}

            </View>

        );
    }
}
const initialArr =[
    {
        id:1,
        text: "ימי הולדת",
    },
    {
        id:2,
        text: "חבר מביא חבר",    },
    {
        id:3,
        text: "עדכוני עובדים ברשת",    },
    {
        id:4,
        text: "תקנון מניעת הטרדה מינית",
    },
    {
        id:5,
        text: "טפסי קליטת עובד חדש",
    }

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

export default HumanResources;
