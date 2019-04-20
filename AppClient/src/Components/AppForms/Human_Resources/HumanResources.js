import React,{Component} from 'react'
import {Image, Keyboard, Text, TouchableOpacity, View} from 'react-native';
import Harassment from "./Harassment";
import MainHeader from "../../common/MainHeader";

class HumanResources extends Component {
    constructor() {
        super();
        this.state = {
            num: 0,
            harassmentData: []
        };
        this.getResponse = this.getResponse.bind(this)

    }
    getResponse(result){
        this.setState({
            harassmentData: result
        });
    }


    render() {
        return (
            <View style={styles.BackStyle}>
                <MainHeader/>
                <Harassment  callback={this.getResponse.bind(this)}/>
                <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Birthdays')}>
                    <Image source = {require('../../../Resources/Birthday.jpg')} style={styles.image}/>

                </TouchableOpacity></View>
                <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Jobs')}>
                    <Image source = {require('../../../Resources/Jobs.jpg')} style={styles.image}/>

                </TouchableOpacity></View>
                <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('pdf',{url: "http://192.168.1.34:3000/"+this.state.harassmentData.image ,
                    title: "מניעת הטרדה מינית"})}>
                    <Image source = {require('../../../Resources/reg.jpg')} style={styles.image}/>

                </TouchableOpacity></View>


            </View>

        );
    }
}
const styles = {
    BackStyle: {
        flex: 1,
        backgroundColor: "#ffc68e",
    },
    image:{
        width: '100%',
        // Without height undefined it won't work
        height: undefined,
        // figure out your image aspect ratio
        aspectRatio: 135 / 76,
    }
}

export default HumanResources;