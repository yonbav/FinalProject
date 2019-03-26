import React ,{Component} from 'react';
import Button from 'react-native-button';
import axios from "axios";
import {Text,View,FlatList} from 'react-native';
import {Actions} from "react-native-router-flux";
import AwesomeButton from "react-native-really-awesome-button";



class Messeges extends Component{
    constructor() {
        super();
        this.state = {
            num: 0,
            isFetching: false
        };
    }
    componentDidMount() {
        this.GetData();
    }


    GetData=()=> {
        this.setState({isFetching:true})
        axios.post("http://192.168.1.34:3000/Message/unreadCount",{
            id: this.props.id
        }).then((res)=> {
            this.setState({num:res.data.docs})
            this.handleClick(res.data.docs);
            this.setState({isFetching:false})

        })
        }
    handleClick(num){
        this.props.callback(num);
    }

    render() {
        return(
            <View>
            </View>
        );
    }
};
const styles = {
    refresh: {
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 0,
        paddingTop: 20,
        justifyContent: 'flex-end',
        justifyItems: 'space-end',
    }
}
export default Messeges;

