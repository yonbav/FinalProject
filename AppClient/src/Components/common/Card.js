

import { Text,View  } from 'react-native';
import React from 'react';

const Card = (props) => {

    return (
        <View style ={styles.containerStyle}>
            {props.children}
        </View>
    );

};
const styles = {
    containerStyle:{
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowOffset: {width: 0 , height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: "#ffc68e"

    }

}
export default Card;