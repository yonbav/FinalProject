import React,{Component} from 'react'
import { Text, View, ScrollView} from 'react-native';
import {Actions} from "react-native-router-flux";
import Header from "../../common/Header";
import axios from "axios";

class MessagesForm extends Component {

    constructor() {
        super();
        this.state = {
            data: [],

        };
        this.GetData = this.GetData.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

    }
    DateView=(dateNow)=>{
        var formattedDate = dateNow.slice(0,10);
        return(<View style = {[styles.MessageStyleBack,{justifyContent: 'flex-start'}]}>
            <Text style={[styles.MessageStyleText,{alignSelf: 'flex-end'},{marginTop: 10}]}>
                {formattedDate}</Text>
        </View>);
    };
    GetData() {
        axios.get('http://192.168.1.32:3000/Message/')
            .then(result => {
                this.setState({
                    data: result.data
                });
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
                    {this.DateView(item.createdtime)}
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
                <View>
                    <Header name="הודעות חשובות"/>
                </View>
                {this.renderButtons()}
            </View>
            </ScrollView>

        );
    }
}
const styles = {
    BackStyle: {
        paddingTop:100,
        backgroundColor: "#ffc68e",
        paddingBottom: 800
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

export default MessagesForm;
