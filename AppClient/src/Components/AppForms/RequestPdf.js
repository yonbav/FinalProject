import React ,{Component} from 'react';
import axios from "axios";
import {Text, View} from 'react-native';



class RequestPdf extends Component{
    componentDidMount() {
        this.GetData();
    }
    GetData() {
        axios.get("http://192.168.1.32:3000/info/"+this.props.title
        ).then((res)=> {
            this.handleClick(res.data);

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


