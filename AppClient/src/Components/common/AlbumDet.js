

import { Text,View,Image  } from 'react-native';
import React,{Component} from 'react';
import Card from "./Card";
import CardSection from "./CardSection";

class AlbumDet extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <View>
                        <Image style={styles.imageStyle} source={{uri: this.props.album.thumbnail_image}}/>
                    </View>
                    <View style={styles.headerStyle}>
                        <Text style={styles.texttitle}> {this.props.album.title}</Text>
                        <Text> {this.props.album.artist}</Text>

                    </View>
                </CardSection>
            </Card>

        );
    };
}
const styles = {
    headerStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    imageStyle: {
        height: 50,
        width: 50
    },
    texttitle: {
        fontSize: 18
    },
    imStyle: {
        height: 300,
        flex: 1,
        width: null
    }

}

export default AlbumDet;