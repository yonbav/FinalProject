

import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Header} from "react-native-elements";

const MainHeader = () => {
    return (
        <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            centerComponent={<Image style={{width: 100, height: 50}} source = {require('../../Resources/Logo.jpg')}/>}
            containerStyle={{
                backgroundColor: '#ffc68e',
                justifyContent: 'space-around',
            }}
        />
    );
};


export default MainHeader;