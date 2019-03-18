import React ,{Component} from 'react';
import {Image, Text, View} from 'react-native';
import IconBadge from 'react-native-icon-badge';



class Mail extends Component{
    render() {
        return(
            <View style={styles.MailStyle}>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
                <IconBadge
                    MainElement={
                        <Image source = {require('../../../Resources/Mail.png')} />
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
        paddingTop: 20,
    }
}
export default Mail;


