import React ,{Component} from 'react';
import Button from 'react-native-button';
import axios from "axios";
import {Text} from 'react-native';



class Messeges extends Component{
    componentDidMount() {
        this.GetData();
    }
    GetData() {
        axios.get("http://192.168.1.32:3000/Auth/get1").then((res)=> {
            this.handleClick(res.data.success);
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
export default Messeges;


