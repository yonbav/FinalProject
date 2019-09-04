

import {ActivityIndicator, Dimensions , View} from 'react-native';
import React from 'react';
import MainHeader from "./MainHeader";

const Spinner = () => {
    return (
        <View>
            <MainHeader/>
        <View style={styles.loading}><ActivityIndicator size="large" color="#000"/></View>
        </View>
    );
};
const styles = {
    loading:{
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop:  ((Dimensions.get('window').height)/4)*3
    }
};

export default Spinner;