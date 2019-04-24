

import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Header} from "react-native-elements";

const MainHeader = () => {
    return (
        <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            centerComponent={<Image style={{width: 150, height: 50}} source = {require('../../Resources/Logo.png')}/>}
            containerStyle={{
                backgroundColor: '#F58220',
                justifyContent: 'space-around',
            }}
        />
    );
};


export default MainHeader;