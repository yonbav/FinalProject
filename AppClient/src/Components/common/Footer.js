

import {Image, Text, View} from 'react-native';
import React from 'react';

const Footer = (props) => {
    return (
        <View style={styles.footer}>
            <Text style={{fontSize: 10}}>{props.des}</Text>
        </View>
    );
};
const styles = {
    footer: {
        flex: 1,
        backgroundColor: '#ffc68e',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
    }
};

export default Footer;