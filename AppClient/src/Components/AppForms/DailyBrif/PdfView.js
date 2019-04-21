import React from 'react';
import {View, Text, Keyboard} from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { CheckBox } from 'react-native-elements'
import axios from "axios";

export default class PdfView extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center',color:"#fff"},
        headerStyle:{
            backgroundColor:'#ffc68d',
        },

    });
    constructor() {
        super();
        this.state = {
            checked: false,
        }
        this.GetData = this.GetData.bind(this);
        this.getResponse = this.getResponse.bind(this)
    }
    getResponse(result){
        this.setState({
            checked: result
        });
    }
    GetData(title,user) {
        if(user) {
            axios.post('http://192.168.1.34:3000/daily/unread', {
                title: title,
                id: user.id
            })
                .then(result => {
                    if (result.data.docs === null) {
                        this.getResponse(true)
                    }
                })
        }
    }
    Checkandpush(title,user){
        if(this.state.checked === false) {
            axios.post('http://192.168.1.34:3000/daily/pushread', {
                title: title,
                id: user.id
            })
                .then(result => {
                    if (result.data.docs === 1) {
                        this.getResponse(true)
                    }
                })
        }
    }
    renderCheckBox(title,user)
    {
        if(user) {
            return (<CheckBox
                center
                title='אשר קריאה'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.checked}
                onPress={() => this.Checkandpush(title,user)}
            />)
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const user = navigation.getParam('user');
        this.GetData(title,user);
    }

    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const url = navigation.getParam('url');
        const user = navigation.getParam('user');
        return (
            <View style={styles.container}>
                <View style={styles.Pdf}>
                <PDFReader
                    source={{ uri: url }}
                />
                </View>
                <View style={styles.Cheack}>
                    {this.renderCheckBox(title,user)}
                </View>
            </View>
        );
    }
}

const styles = ({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    Cheack: {
        flex: 1,
        backgroundColor: '#ffc68d'
    },
    Pdf: {
        flex: 12,
        backgroundColor: '#ecf0f1',

    }
});
