import React,{Component} from 'react'
import {BackHandler, Keyboard, Text, View} from 'react-native';
import {Actions} from "react-native-router-flux";

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

            <Text>idan</Text>
            </View>
        );
    }
}
const styles = {
    BackStyle: {
        backgroundColor: "#ffc68e",
        paddingBottom: 800
    }
}

export default DailyBrif;
