import React ,{Component} from 'react';
import axios from "axios";
import {Text} from 'react-native';



class Sales extends Component{
    componentDidMount() {
        this.GetData();
    }
    GetData() {
        axios.get("http://192.168.1.32:3000/info/Sales"
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
export default Sales;


