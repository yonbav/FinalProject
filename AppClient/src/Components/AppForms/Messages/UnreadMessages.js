
import React,{Component} from 'react'
import {Text, View, ScrollView, ActivityIndicator, AsyncStorage,Alert} from 'react-native';
import axios from "axios";
import MessageFormat1 from "./MessageFormat1";
import deviceStorage from'../../../Services/deviceStorage'
class UnreadMessages extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            loading: false

        };
        this.GetData = this.GetData.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

    }
    async GetData() {
        const value = await AsyncStorage.getItem('id_token');
        axios.post('http://192.168.1.34:3000/Message/unread',{
            id: this.props.id
        },{ headers: { token: value} }).then(result => {
            if(result.data.success === false){
                this.setState({
                    loading: true
                });
                Alert.alert(
                    'הודעת אבטחה',
                    'אין הרשאות נא פנה לנציג',
                )
            }else{
                this.setState({
                    data: result.data,
                    loading: true
                });
            }




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
                <MessageFormat1 key={item._id} link={item.link} id1={item._id} id={this.props.id} title={item.title} contect={item.contect} Date={item.createdtime}/>
            );

        });

    }

    render() {
        if(this.state.loading === true) {
            return (
                <ScrollView style={[styles.BackStyle, {flex: 1}]}>
                    <View style={styles.BackStyle}>
                        {this.renderButtons()}
                    </View>
                </ScrollView>

            );
        }
        else{
            return (<View>
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#000"/></View>
            </View>);
        }
    }
}
const styles = {

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
    loading:{
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 500
    }
}

export default UnreadMessages;