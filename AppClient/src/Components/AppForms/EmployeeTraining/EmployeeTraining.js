import React,{Component} from 'react'
import {Linking, TouchableOpacity, View} from 'react-native';
import Button from 'react-native-button';
import RequestPdf from "../RequestPdf";
import MainHeader from "../../common/MainHeader";

class EmployeeTraining extends Component {

    constructor() {
        super();
        this.state = {
            num: 0,
            Data: []
        };
        this.getResponse = this.getResponse.bind(this)

    }
    findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
    mixFunction=(text,id)=>{
        this.props.navigation.navigate('pdf',{url: "http://192.168.1.34:3000/"+this.state.Data[id].image,title: text});
    }

    getResponse(result){
        this.state.Data.push(result);
    }

    render() {
        return (
            <View style={styles.BackStyle}>
                <MainHeader/>

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
                    <RequestPdf title ="Trainingfornewemployees" callback={this.getResponse.bind(this)}/>
                    <Button
                        onPress={() => this.mixFunction("חוברת הדרכה על הקופה",
                            this.findWithAttr(this.state.Data,'title',"Trainingfornewemployees"))}                        containerStyle ={styles.buttonStyleBack}
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
                    <RequestPdf title ="CheckListNewEmploee" callback={this.getResponse.bind(this)}/>
                    <Button
                        onPress={() => this.mixFunction("צ'ק ליסט קליטה",
                            this.findWithAttr(this.state.Data,'title',"CheckListNewEmploee"))}
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
        flex:1,
        backgroundColor: "#ffc68e",
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
