import React ,{Component} from 'react';
import {AsyncStorage, Text} from 'react-native';
import api from '../../../api.js';
import API_URL from "../../../apiUrl";



class Sales extends Component{
    componentDidMount() {
        this.GetData();
    }
    async GetData() {
        api.get(`${API_URL.GET_ALL_IMPORTANT_INFO}Sales`).then((res)=> {
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

