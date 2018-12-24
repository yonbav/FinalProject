import { Text,View ,Image } from 'react-native';
import React from 'react';

const Applogo = () => {

    return (
        <View style = {styles.TopStyle}>
        <View style={styles.ImageStyle}>
            <Image source = {require('../../Resources/Logo.jpg')}/>
        </View>
        </View>
    );

};
const styles = {
    ImageStyle:{
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 15,
    },
    TopStyle:{
        backgroundColor: "#FF7802"
    }
};
export default Applogo;