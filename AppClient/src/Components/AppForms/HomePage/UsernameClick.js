import React ,{Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux";



class UsernameClick extends Component{
    render() {
        return(
            <View style={styles.userMenu}>
                <TouchableOpacity  onPress={() => Actions.Profile({user: this.props.user})}>
                    <Image source = {require('../../../Resources/usermenu.png')} />
                </TouchableOpacity >
            </View>        );
    }
};
const styles = {
    userMenu:{
        alignItems:'flex-start',
        alignSelf: 'flex-start',
        paddingTop: 20,

    }
}
export default UsernameClick;


