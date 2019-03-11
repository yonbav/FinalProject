import React,{Component} from 'react'
import { Text, View, ScrollView} from 'react-native';
import Header from "../../common/Header";
import axios from "axios";

class AllMessages extends Component {

    constructor() {
        super();
        this.state = {
            data: [],

        };
        this.GetData = this.GetData.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

    }

    GetData() {
        axios.get('http://192.168.43.209:3000/Message/')
            .then(result => {
                this.setState({
                    data: result.data
                });
                if(result.data.length === 0){
                    return (<View style = {[styles.MessageStyleBack,{justifyContent: 'center'}]}>
                        <Text style={[styles.MessageStyleText,{alignSelf: 'center'},{fontWeight: 'bold'}]}>
                            אין הודעות
                        </Text>
                    </View>)
                }
            })

    }
    componentDidMount() {
        this.GetData();
    }
    renderButtons() {

        return this.state.data.map((item) => {
            return (
                <View key={item._id} style={styles.containerStyle}>
                    <View style = {[styles.MessageStyleBack,{justifyContent: 'center'}]}>
                        <Text style={[styles.MessageStyleText,{alignSelf: 'center'},{fontWeight: 'bold'}]}>
                            {item.title}
                        </Text>
                    </View>
                    <View style = {[styles.MessageStyleBack,{justifyContent: 'flex-start'}]}>
                        <Text style={[styles.MessageStyleText,{alignSelf: 'flex-start'}]}>
                            {item.contect}</Text>
                    </View>
                    <View style = {[styles.MessageStyleBack,{justifyContent: 'flex-start'}]}>
                        <Text style={[styles.MessageStyleText,{alignSelf: 'flex-end'},{marginTop: 10}]}>
                            {item.createdtime}
                        </Text>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    />
                </View>
            );

        });

    }

    render() {
        return (
            <ScrollView style={{flex:1}}>
                <View style={styles.BackStyle}>
                    {this.renderButtons()}
                </View>
            </ScrollView>

        );
    }
}
const styles = {
    BackStyle: {
        paddingTop:20,
    },
    MessageStyleBack:{
        margin:5,
        height:45,
        alignItems: 'flex-start',

    },
    MessageStyleText:{
        color:'#050002',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10
    },
    containerStyle:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ffc68e',
        borderColor: '#ffc68e',
        position: 'relative',
        margin: 5,

    },

}

export default AllMessages;
