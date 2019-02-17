import React from 'react';
import { View } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';

export default class PdfView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <PDFReader
                    source={{ uri: "http://gahp.net/wp-content/uploads/2017/09/sample.pdf" }}
                />
            </View>
        );
    }
}

const styles = ({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});