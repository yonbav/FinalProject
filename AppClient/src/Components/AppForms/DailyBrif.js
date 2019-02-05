import React,{Component} from 'react'
import {BackHandler, Keyboard, Text, View} from 'react-native';
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import Header from "../common/Header";

class DailyBrif extends Component {

    componentDidMount() {
        Keyboard.dismiss()

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.goBack(); // works best when the goBack is async
            return true;
        });

    }
    goBack =() => {
        Actions.Home()
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }
    render() {
        return (
            <View style={styles.BackStyle}>
                <Header name="תדריך יומי"/>
            </View>
        );
    }
}
const styles = {
    BackStyle: {
        paddingTop:100,
        backgroundColor: "#ffc68e",
        paddingBottom: 800
    }
}

export default DailyBrif;
