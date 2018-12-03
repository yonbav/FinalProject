

import { Text,View  } from 'react-native';
import React from 'react';

const Header = (props) => {
  const {textStyle,viewStyle} = styles;
 return (
 <View style={viewStyle}>
 <Text style = {textStyle}> {props.name}</Text>
 </View>
 );
};
const styles = {
viewStyle:{
backgroundColor: '#fff',
justifyContent: 'center',
alignItems: 'center',
height: 30,
paddingTop:10
},
textStyle: {
fontSize: 20,
color: 'black'


}
};

export default Header;