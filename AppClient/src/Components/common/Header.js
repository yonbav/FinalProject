

import {Image, Text, View} from 'react-native';
import React from 'react';

const Header = (props) => {
    const {textStyle,viewStyle} = styles;
    return (
        <View style={viewStyle}>
            <View style={styles.ImageStyle}>
                <Image source = {require('../../Resources/Logo.jpg')}/>
            </View>
            <Text style = {textStyle}> {props.name}</Text>

        </View>
    );
};
const styles = {
    viewStyle:{
        backgroundColor: '#ffc68e',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 10,
        paddingTop:5,
        flexDirection: 'row',

    },
    textStyle: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold'
    },
    ImageStyle:{
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        flex: 3,
    }
};

export default Header;