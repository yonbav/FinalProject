

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
backgroundColor: 'yellow',
justifyContent: 'center',
alignItems: 'center',
height: 80,
paddingTop:10
},
textStyle: {
fontSize: 80,
color: 'black'


}
};

export default Header;