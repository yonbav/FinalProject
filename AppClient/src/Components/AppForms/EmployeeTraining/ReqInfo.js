import React ,{Component} from 'react';
import axios from "axios";
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {Body, Card, CardItem, Left, Thumbnail} from "native-base";
import MainHeader from "../../common/MainHeader";



class ReqInfo extends Component{
    constructor() {
        super();
        this.state = {
            Data: []
        };

    }
    componentDidMount() {
        this.GetData();
    }
    GetData() {
        axios.get("http://192.168.1.34:3000/minhal/"
        ).then((res)=> {
           this.setState({
               Data: res.data
           })
        })
    }
    renderButtons(){
        return this.state.Data.map((element)=>(<View key={element._id}><TouchableOpacity onPress={() => {
            this.props.navigation.navigate('pdf', {
                url: "http://192.168.1.34:3000/" + element.image,
                title: element.title
            })
        }}>


            <Card><CardItem><Left><Thumbnail source={require("../../../Resources/document.png")}
                                             style={{height: 50, width: 50}}/>
                <Body><Text>{element.title}</Text></Body>
            </Left></CardItem></Card></TouchableOpacity></View>));
    }

    render() {
        if(this.state.Data !== null) {
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
        paddingTop: 500
    }
}
export default ReqInfo;

