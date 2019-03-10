import React,{Component} from 'react'
import { Linking, View} from 'react-native';
import Header from "../../common/Header";
import Button from 'react-native-button';

class EmployeeTraining extends Component {



    render() {
        return (
            <View style={styles.BackStyle}>
                <View>
                    <Header name="הדרכת עובדים"/>
                </View>

                <View style = {styles.containerStyle}>
                    <Button
                        onPress={() => { Linking.openURL('https://google.com')}}
                        containerStyle ={styles.buttonStyleBack}
                        style={styles.buttonStyleText}>
                        לינק לסרטון עובד חדש
                    </Button>
                </View>
                <View style = {styles.containerStyle}>
                    <Button
                        containerStyle ={styles.buttonStyleBack}
                        style={styles.buttonStyleText}>
                        חוברת קליטה לעובד חדש
                    </Button>
                    <Button
                        containerStyle ={styles.buttonStyleBack}
                        style={styles.buttonStyleText}>
                        חוברת הדרכה על הקופה
                    </Button>

                </View>
                <View style = {styles.containerStyle}>
                    <Button
                        containerStyle ={styles.buttonStyleBack}
                        style={styles.buttonStyleText}>
                        לינק למבדק ידע עובד חדש
                    </Button>
                    <Button
                        containerStyle ={styles.buttonStyleBack}
                        style={styles.buttonStyleText}>
                        צ'ק ליסט קליטה לעובד חדש
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

export default EmployeeTraining;
