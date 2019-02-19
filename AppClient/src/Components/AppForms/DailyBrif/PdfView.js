import React from 'react';
import { View,Text} from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { CheckBox } from 'react-native-elements'

export default class PdfView extends React.Component {
    constructor() {
        super();
        this.state = {
            checked: false
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.Pdf}>
                <PDFReader
                    source={{ uri: "http://gahp.net/wp-content/uploads/2017/09/sample.pdf" }}
                />
                </View>
                <View style={styles.Cheack}>
                    <CheckBox
                        center
                        title='אשר קריאה'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked}
                        onPress={() => this.setState({checked: !this.state.checked})}
                    />
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
        backgroundColor:'#ffc68d'
},
    Pdf: {
        flex: 12,
        backgroundColor: '#ecf0f1',

    }
});