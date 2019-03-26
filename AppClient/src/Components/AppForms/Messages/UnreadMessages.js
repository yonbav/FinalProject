
import React,{Component} from 'react'
import { Text, View, ScrollView} from 'react-native';
import axios from "axios";
import {Actions} from "react-native-router-flux";
import MessageFormat from "./MessageFormat";

class UnreadMessages extends Component {

    constructor() {
        super();
        this.state = {
            data: [],

        };
        this.GetData = this.GetData.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

    }
    GetData() {
        axios.post('http://192.168.1.34:3000/Message/unread',{
            id: this.props.id
        }).then(result => {
                this.setState({
                    data: result.data
                });

                this.update();

            })

    }
    update(){
        axios.post("http://192.168.1.34:3000/Message/pushread",{
            id: this.props.id
        })
    }
    componentDidMount() {
        this.GetData();
    }
    renderButtons() {
        if(this.state.data.length === 0){
            return (
                <View style = {[styles.MessageStyleBack,{justifyContent: 'center'}]}>
                    <Text style={[styles.MessageStyleText,{alignSelf: 'center'},{fontWeight: 'bold'}]}>
                        אין הודעות
                    </Text>
                </View>
            )
        }
        return this.state.data.map((item) => {
            return (
                <MessageFormat key={item._id} title={item.title} contect={item.contect} Date={item.createdtime}/>
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

export default UnreadMessages;