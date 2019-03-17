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
    },
    TopStyle:{
        backgroundColor: "#ffc68e",
    }
};
export default Applogo;