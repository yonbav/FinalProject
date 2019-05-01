import React ,{Component} from 'react';
import axios from "axios";
import {AsyncStorage, Text, View} from 'react-native';



class RequestPdf extends Component{
    componentDidMount() {
        this.GetData();
    }
    async GetData() {
        const value = await AsyncStorage.getItem('id_token');
        axios.get("http://192.168.1.34:3000/info/"+this.props.title
            ,{ headers: { token: value} }).then((res)=> {
            if(res.data.success !== false){
                this.handleClick(res.data);
            }


        })
    }
    handleClick(num){
        this.props.callback(num);
    }
    render() {
        return(
            <Text></Text>
        );
    }
};

export default RequestPdf;

