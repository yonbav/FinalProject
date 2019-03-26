import React from 'react';
import {View, Text, Keyboard} from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { CheckBox } from 'react-native-elements'
import axios from "axios";

export default class PdfView extends React.Component {
    constructor() {
        super();
        this.state = {
            checked: false
        }
        this.GetData = this.GetData.bind(this);
        this.getResponse = this.getResponse.bind(this)
    }
    getResponse(result){
        this.setState({
            checked: result
        });
    }
    GetData() {
        if(this.props.user) {
            axios.post('http://192.168.1.34:3000/daily/unread', {
                title: this.props.title,
                id: this.props.user.id
            })
                .then(result => {
                    if (result.data.docs === null) {
                        this.getResponse(true)
                    }
                })
        }
    }
    Checkandpush(){
        if(this.state.checked === false) {
            axios.post('http://192.168.1.34:3000/daily/pushread', {
                title: this.props.title,
                id: this.props.user.id
            })
                .then(result => {
                    if (result.data.docs === 1) {
                        this.getResponse(true)
                    }
                })
        }
    }
    renderCheckBox()
    {
        if(this.props.user) {
            return (<CheckBox
                center
                title='אשר קריאה'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.checked}
                onPress={() => this.Checkandpush()}
            />)
        }
    }
    componentDidMount() {
        this.GetData();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.Pdf}>
                <PDFReader
                    source={{ uri: this.props.url }}
                />
                </View>
                <View style={styles.Cheack}>
                    {this.renderCheckBox()}
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
