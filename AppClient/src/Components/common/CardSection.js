

import { Text,View  } from 'react-native';
import React from 'react';

const CardSection = (props) => {

    return (
        <View style ={styles.containerStyle}>
            {props.children}
        </View>
    );

};
const styles = {
    containerStyle:{
       borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#fff',
        position: 'relative'

    }

}
export default CardSection;