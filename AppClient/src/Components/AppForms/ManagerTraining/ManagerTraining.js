import React,{Component} from 'react'
import {View,} from 'react-native';
import Header from "../../common/Header";
import Button from 'react-native-button';

class ManagerTraining extends Component {


    render() {
        return (
            <View style={styles.BackStyle}>
                <View>
                    <Header name="הדרכת מנהלים"/>
                </View>
                <View style = {styles.containerStyle}>
                    <Button
                        containerStyle ={styles.buttonStyleBack}
                        style={styles.buttonStyleText}>
                        צ'ק ליסט יום יומי של מנהל הסניף
                    </Button>
                </View>
                <View style = {styles.containerStyle}>
                <Button
                    containerStyle ={styles.buttonStyleBack}
                    style={styles.buttonStyleText}>
                    צ'ק ליסט פריוריטי
                </Button>
                </View>
                <View style = {styles.containerStyle}>
                <Button
                    containerStyle ={styles.buttonStyleBack}
                    style={styles.buttonStyleText}>
                    צ'ק ליסט חניכת מנהל חדש
                </Button>
                </View>
                <View style = {styles.containerStyle}>
                    <Button
                        containerStyle ={styles.buttonStyleBack}
                        style={styles.buttonStyleText}>
                        חוברת הדרכה פריורטי
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
        width:400,
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

export default ManagerTraining;