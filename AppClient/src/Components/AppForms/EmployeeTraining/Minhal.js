import React,{Component} from 'react'
import {ActivityIndicator, Dimensions, ScrollView, Text, TouchableOpacity, View,} from 'react-native';
import ReqInfo from "./ReqInfo";

class Minhal extends Component {

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
                    <ReqInfo  navigation={this.props.navigation} type="minhal"/>
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
        paddingTop:  ((Dimensions.get('window').height)/4)*3
    }
}

export default Minhal;