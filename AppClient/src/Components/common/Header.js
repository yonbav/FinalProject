

import {Image, Text, View} from 'react-native';
import React from 'react';

const Header = (props) => {
    const {textStyle,viewStyle} = styles;
    return (
        <View>
        <View style={viewStyle}>
            <Text style = {textStyle}> {props.name}{'  '}
                <Image style={styles.ImageStyle} source = {require('../../Resources/Logo.png')}/>
            </Text>

        </View>
        <View
              style={{
                borderBottomColor: 'black',
                     borderBottomWidth: 1,
                    }}
                />
        </View>
    );
};
const styles = {
    viewStyle:{
        backgroundColor: '#ffc68e',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 10,
        paddingTop:40,
        flexDirection: 'row',
        marginBottom: 10

    },
    textStyle: {
        fontSize: 23,
        color: 'black',
        fontWeight: 'bold'
    },
    ImageStyle:{
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        paddingLeft: 15
    }
};

export default Header;