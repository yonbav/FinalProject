import React,{Component} from 'react'
import {Image, Linking, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Button from 'react-native-button';
import RequestPdf from "../RequestPdf";
import MainHeader from "../../common/MainHeader";
import VideoFormat from "./VideoFormat";
import TestFormat from "./TestFormat";

import {Body, Card, CardItem, Left, Thumbnail} from "native-base";
import PdfGuidance from "./PdfGuidance";

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
        if(this.state.Data.length !==0){
            this.props.navigation.navigate('pdf',{url: "http://185.56.74.46:3000/Information/"+this.state.Data[id].image,title: text});
        }
    }

    getResponse(result){
        this.state.Data.push(result);
    }

    render() {
        return (
            <ScrollView style={styles.BackStyle}>
                <MainHeader/>
                <RequestPdf title ="Instruction" callback={this.getResponse.bind(this)}/>
                <RequestPdf title ="Trainingfornewemployees" callback={this.getResponse.bind(this)}/>
                <RequestPdf title ="CheckListNewEmploee" callback={this.getResponse.bind(this)}/>

                <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Guidance')}>
                <Card ><CardItem  style={{backgroundColor: '#ff923d'}}><Left><Thumbnail source={require( "../../../Resources/FolerGuidance.jpg")} style={{height: 80, width: 80}}/>
                    <Body><Text style={{fontWeight: 'bold',fontSize:25,alignSelf: 'center'}}>תיקיית הדרכות</Text></Body>
                </Left></CardItem></Card>
                </TouchableOpacity>
               <VideoFormat name="סרטון עובד חדש"/>

                    <TouchableOpacity   onPress={() => this.mixFunction("חוברת קליטה לעובד חדש", this.findWithAttr(this.state.Data,'title',"Trainingfornewemployees"))}>
                        <PdfGuidance title="חוברת קליטה לעובד חדש"/>
                      </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.mixFunction("חוברת הדרכה על הקופה", this.findWithAttr(this.state.Data,'title',"Instruction"))}    >
                    <PdfGuidance title="חוברת הדרכה על הקופה"/></TouchableOpacity>


                <TestFormat name="מבדק ידע עובד חדש"/>

                    <TouchableOpacity   onPress={() => this.mixFunction("צ'ק ליסט קליטה לעובד חדש", this.findWithAttr(this.state.Data,'title',"CheckListNewEmploee"))} >
                        <PdfGuidance title="צ'ק ליסט קליטה לעובד חדש"/>
                      </TouchableOpacity>

            </ScrollView>
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
