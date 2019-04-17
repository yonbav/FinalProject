import React from 'react';
import {Text, View, TextInput} from 'react-native';


const Input = ({label, value , onChangeText,placeholder,secureTextEntry}) => {
    return (
        <View style = {styles.containerStyle}>
            <Text style = {styles.labelStyle}>
                {label}
            </Text>
            <TextInput style = {styles.inputStyle}
                                 placeholder={placeholder}
                                 secureTextEntry={secureTextEntry}
                                 value={value}
                                 autoCorrect={false}
                                 onChangeText={onChangeText}
        />


        </View>
    );


};
const  styles = {
  inputStyle:{
      color: '#000',
      paddingRight: 15,
      paddingLeft: 15,
      fontSize:18,
      lineHeight: 23,
      flex: 8,
      textAlign: 'right'
  },

    labelStyle: {
        paddingRight: 5,
        flex: 1,
        paddingBottom: 16,
        paddingLeft: 5,
    },
    containerStyle:{
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export default Input;