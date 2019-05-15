import React,{Component} from 'react'
import {Image, Keyboard, Text, TouchableOpacity, View,ScrollView} from 'react-native';
import Harassment from "./Harassment";
import MainHeader from "../../common/MainHeader";
import HaressmentFormat from "./HaressmentFormat";
import BirthdayFormat from "./BirthdayFormat";
import JobsFormat from "./JobsFormat";

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
            <ScrollView style={styles.BackStyle}>
                <MainHeader/>
                <Harassment  callback={this.getResponse.bind(this)}/>
                <BirthdayFormat   title="ימי הולדת" navigation={this.props.navigation}/>
                <JobsFormat   title="חבר מביא חבר" navigation={this.props.navigation}/>
                <HaressmentFormat  url={"http://192.168.43.209:3000/Information/"+this.state.harassmentData.image} title="תקנון מניעת הטרדה מינית"  user={this.props.user}
                                    navigation={this.props.navigation}/>

            </ScrollView>

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