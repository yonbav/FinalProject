import React ,{Component} from 'react';
import Button from 'react-native-button';
import axios from "axios";
import {Text} from 'react-native';
import {Actions} from "react-native-router-flux";
import AwesomeButton from "react-native-really-awesome-button";



class Messeges extends Component{
    componentDidMount() {
        this.GetData();
    }
    GetData() {
        axios.post("http://192.168.1.32:3000/Message/unreadCount",{
            id: this.props.id
        }).then((res)=> {
            this.handleClick(res.data.docs);
        })
        }
    handleClick(num){
        this.props.callback(num);
    }
    render() {
        return(
            <AwesomeButton
                progress
                style={{}}
                progressLoadingTime = '1000'
                backgroundColor = "#373c84"
                onPress={next => {
                    this.GetData();
                    next();}}
            >
                Refresh
            </AwesomeButton>

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


