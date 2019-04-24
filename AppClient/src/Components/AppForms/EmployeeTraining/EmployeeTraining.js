import React,{Component} from 'react'
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import Button from 'react-native-button';
import RequestPdf from "../RequestPdf";
import MainHeader from "../../common/MainHeader";
import VideoFormat from "./VideoFormat";
import TestFormat from "./TestFormat";

import {Body, Card, CardItem, Left, Thumbnail} from "native-base";

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
                <RequestPdf title ="Instruction" callback={this.getResponse.bind(this)}/>
                <RequestPdf title ="Trainingfornewemployees" callback={this.getResponse.bind(this)}/>
                <RequestPdf title ="CheckListNewEmploee" callback={this.getResponse.bind(this)}/>
                <MainHeader/>
               <VideoFormat name="סרטון עובד חדש"/>
                    <TouchableOpacity   onPress={() => this.mixFunction("חוברת קליטה לעובד חדש",
                        this.findWithAttr(this.state.Data,'title',"Trainingfornewemployees"))}>
                        <Card><CardItem><Left><Thumbnail source={require( "../../../Resources/Book.jpg")} style={{height: 50, width: 50}}/>
                                    <Body><Text style={styles.title}>חוברת קליטה לעובד חדש</Text></Body>
                        </Left></CardItem></Card></TouchableOpacity>
                <TouchableOpacity  onPress={() => this.mixFunction("חוברת הדרכה על הקופה", this.findWithAttr(this.state.Data,'title',"Instruction"))}    >
                    <Card><CardItem><Left><Thumbnail source={require( "../../../Resources/Book.jpg")} style={{height: 50, width: 50}}/>
                                <Body><Text style={styles.title}>חוברת הדרכה על הקופה</Text></Body>
                            </Left></CardItem></Card></TouchableOpacity>


                <TestFormat name="מבדק ידע עובד חדש"/>

                    <TouchableOpacity   onPress={() => this.mixFunction("צ'ק ליסט קליטה לעובד חדש", this.findWithAttr(this.state.Data,'title',"CheckListNewEmploee"))} >
                        <Card><CardItem><Left><Thumbnail source={require( "../../../Resources/list.png")} style={{height: 50, width: 50}}/>
                            <Body><Text style={styles.title}> צ'ק ליסט קליטה לעובד חדש</Text></Body>
                        </Left></CardItem></Card></TouchableOpacity>

            </View>
        );
    }
}
const styles = {
    BackStyle: {
        flex:1,
        backgroundColor: "#ffc68e",
    },
    title:{
        alignSelf: 'center',alignContent: 'center',fontWeight: 'bold',fontSize:15
    }

}

export default EmployeeTraining;
