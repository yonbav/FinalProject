import React ,{Component} from 'react';
import axios from "axios";
import {ActivityIndicator, Alert, AsyncStorage, Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {Body, Card, CardItem, Left, Thumbnail} from "native-base";
import MainHeader from "../../common/MainHeader";
import * as WebBrowser from "expo-web-browser";
import API_URL from "../../../apiUrl";
import api from '../../../api.js';



class ReqInfo extends Component{
    constructor() {
        super();
        this.state = {
            Data: [],
            loading:false
        };

    }
    componentDidMount() {
        this.GetData();
    }
    async GetData() {

        api.get(this.props.type).then((res) => {
            if(res.data.success !== false) {
                this.setState({
                    Data: res.data,
                    loading:true
                })
            }else{
                this.setState({
                    loading:true
                });
                Alert.alert(
                    'הודעת אבטחה',
                    'אין הרשאות נא פנה לנציג',
                )
            }
        })
    }
    renderButtons(){
        if(this.state.Data.length !== 0){
            return this.state.Data.map((element)=>(<View key={element._id}><TouchableOpacity onPress={async () => {
                await WebBrowser.openBrowserAsync(`${API_URL.SERVER_URL}${API_URL.PDF_FOLDER_NAME}${element.image}`);
            }}>


                <Card><CardItem><Left><Thumbnail source={require("../../../Resources/document.png")}
                                                 style={{height: 50, width: 50}}/>
                    <Body><Text>{element.title}</Text></Body>
                </Left></CardItem></Card></TouchableOpacity></View>));
        }

    }

    render() {
        if(this.state.loading === true) {
            return (
                <View style={{
                    backgroundColor: "#ffc68e",
                    flex: 1
                }}>
                    {this.renderButtons()}
                </View>
            );
        }
        else{
            return (<View>
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#000"/></View>
            </View>);
        }
    }
};
const styles = {
    loading:{
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop:  ((Dimensions.get('window').height)/4)*3
    }
}
export default ReqInfo;

