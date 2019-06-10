import React ,{Component} from 'react';
import axios from "axios";
import {AsyncStorage, Text} from 'react-native';



class Sales extends Component{
    componentDidMount() {
        this.GetData();
    }
    async GetData() {
        const value = await AsyncStorage.getItem('id_token');
        axios.get("http://185.56.74.46:3000/info/Sales"
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

