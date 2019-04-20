import React ,{Component} from 'react';
import {Image, Text, View} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import IconF from "react-native-vector-icons/Feather";



class Mail extends Component{
    render() {
        return(
            <View style={styles.MailStyle}>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
                <IconBadge
                    MainElement={
                        <IconF name="mail"  size={40}/>
                    }
                    BadgeElement={
                        <Text style={{color:'#FFFFFF'}}>{this.props.num}</Text>
                    }
                    IconBadgeStyle={
                        {width:10,
                            height:20,
                            backgroundColor: '#ff151f'}
                    }
                    Hidden={this.props.num ===0}
                />
            </View>
            </View>);
    }
};

const styles = {
    MailStyle: {
        alignItems:'flex-end',
        alignSelf: 'flex-end',
    }
}
export default Mail;


