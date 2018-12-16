

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
        backgroundColor: '#ffc68e',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'

    }

}
export default CardSection;