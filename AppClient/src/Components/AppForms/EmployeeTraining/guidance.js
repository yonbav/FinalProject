import React,{Component} from 'react'
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View,} from 'react-native';
import ReqInfo from "./ReqInfo";

class guidance extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            Data: []
        };
    }

    render() {
        return (
            <ScrollView style={[styles.BackStyle,{flex:1}]}>
                <ReqInfo  navigation={this.props.navigation} type="guidance"/>
            </ScrollView>

        );


    }
}
const styles = {
    BackStyle: {
        backgroundColor: "#ffc68e",
        flex:1
    },
    loading:{
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 500
    }
}

export default guidance;