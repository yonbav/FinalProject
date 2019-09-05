

import {ActivityIndicator, Dimensions, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MainHeader from "./MainHeader";

const NetworkError = () => {
    return (
        <View style={styles.loading}>
                <Text>{props.error}</Text>
        </View>
    );
};
const styles = {
    loading:{
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: ((Dimensions.get('window').height)/2)

    }
};

export default NetworkError;